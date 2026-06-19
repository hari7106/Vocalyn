import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { transcript } = await req.json();

    // 🚨 HARD GUARD
    if (!Array.isArray(transcript) || transcript.length < 5) {
      return NextResponse.json({
        score: 2,
        summary: "The interview contained very limited responses.",
        strengths: ["Participated in the interview"],
        improvements: [
          "Provide longer and clearer answers",
          "Explain reasoning with examples",
        ],
        insights: ["Low response depth detected"],
      });
    }

    // Handle both string arrays and object arrays (with role/content)
    const formattedTranscript = transcript
      .map((item, i) => {
        const content = typeof item === "string" ? item : item.content || "";
        return `${i + 1}. ${content}`;
      })
      .join("\n");

    const prompt = `
You are a STRICT interview evaluator.

IMPORTANT RULES:
- You MUST NOT give 10/10 unless the candidate shows deep reasoning, clarity, and consistency
- If answers are short, unclear, or generic, score MUST be below 7
- strengths, improvements, insights MUST each contain AT LEAST 2 items
- Base EVERYTHING on the transcript. Do not invent praise.

Transcript:
${formattedTranscript}

Return ONLY valid JSON in this exact format:

{
  "score": number (1-10),
  "summary": string,
  "strengths": string[],
  "improvements": string[],
  "insights": string[]
}
`;

    // Support GEMINI_API_KEY (preferred) or fallback to OPENAI_API_KEY for convenience
    const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;
    const model = process.env.GEMINI_MODEL || "models/text-bison-001";

    // Use standard generateContent method for modern Gemini models (e.g. gemini-2.5-flash)
    const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`;

    const resp = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
          maxOutputTokens: 4096,
          thinkingConfig: {
            thinkingBudget: 0,
          },
        },
      }),
    });

    const completion = await resp.json();

    // 🚨 Check for HTTP errors or error block in response payload
    if (!resp.ok || completion.error) {
      console.error(
        "Gemini API Error details:",
        completion.error || completion,
      );
      throw new Error(
        `Gemini API Error: ${completion.error?.message || resp.statusText || "Unknown error"}`,
      );
    }

    // 🚨 Check if candidates are missing (e.g. due to safety blocks)
    if (!completion?.candidates || completion.candidates.length === 0) {
      console.error("Gemini API response candidate is empty:", completion);
      throw new Error(
        "Gemini API: No candidates returned (possibly blocked by safety settings)",
      );
    }

    let raw = completion?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) {
      raw = completion?.candidates?.[0]?.output || JSON.stringify(completion);
    }

    // Strip markdown code block wrappers if present
    if (typeof raw === "string") {
      raw = raw
        .replace(/^```json\s*/i, "")
        .replace(/```\s*$/, "")
        .trim();
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (parseErr) {
      console.error("FAILED TO PARSE RAW GEMINI RESPONSE:", raw);
      console.error(
        "FULL GEMINI COMPLETION OBJECT:",
        JSON.stringify(completion, null, 2),
      );
      throw new Error(`Gemini JSON parsing failure: ${parseErr.message}`);
    }

    // 🛡️ FINAL SAFETY NET
    if (
      !parsed.strengths?.length ||
      !parsed.improvements?.length ||
      !parsed.summary
    ) {
      throw new Error("Incomplete feedback generated");
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("FEEDBACK ERROR:", err);

    return NextResponse.json({
      score: 3,
      summary:
        "The interview responses lacked sufficient detail for a full evaluation.",
      strengths: ["Attempted to answer questions"],
      improvements: [
        "Answer with more depth",
        "Explain thought process clearly",
      ],
      insights: ["Response quality needs improvement"],
    });
  }
}
