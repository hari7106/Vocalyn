import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    const completion = await openai.chat.completions.create({
      model: "gpt-4-mini",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a harsh but fair technical interviewer who evaluates conservatively.",
        },
        { role: "user", content: prompt },
      ],
    });

    const raw = completion.choices[0].message.content;

    const parsed = JSON.parse(raw);

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
