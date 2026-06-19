"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
// No database persistence required for feedback display

export default function FeedbackPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  // no saving required when only displaying feedback

  useEffect(() => {
    async function loadFeedback() {
      try {
        // 🧠 transcript already saved by you
        const transcript = JSON.parse(
          sessionStorage.getItem("interviewTranscript") || "[]",
        );

        // Debug: inspect transcript saved from the interview
        console.log("Feedback: transcript loaded", transcript);

        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch feedback");
        }

        const data = await res.json();
        console.log("Feedback API response:", data);

        // If transcript is very short, show a helpful message instead of generic 2/10
        if (Array.isArray(transcript) && transcript.length < 5) {
          setError(
            `Transcript too short (${transcript.length} items). Please ensure you answered at least 5 prompts.`,
          );
          return;
        }

        setFeedback(data);

        // ✅ Save interview results to localStorage for dashboard retrieval
        try {
          const storedConfig = JSON.parse(
            sessionStorage.getItem("interviewConfig") || "{}",
          );
          const newInterview = {
            id: Date.now().toString(),
            title: storedConfig.jobPosition || "AI Mock Interview",
            date: new Date().toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
            score: data.score || 0,
          };
          const existing = JSON.parse(
            localStorage.getItem("vocalyn_interviews") || "[]",
          );
          const alreadySaved = existing.some(
            (inv) =>
              inv.title === newInterview.title &&
              inv.score === newInterview.score &&
              Math.abs(Number(inv.id) - Number(newInterview.id)) < 5000,
          );
          if (!alreadySaved) {
            localStorage.setItem(
              "vocalyn_interviews",
              JSON.stringify([newInterview, ...existing]),
            );
          }
        } catch (storageErr) {
          console.error(
            "Failed to save interview to localStorage:",
            storageErr,
          );
        }
      } catch (err) {
        console.error(err);
        setError("Unable to generate feedback");
      } finally {
        setLoading(false);
      }
    }

    loadFeedback();
  }, []);

  // persistence removed — feedback is only displayed to the user

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Generating your interview feedback…
      </div>
    );
  }

  if (error || !feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error || "Something went wrong"}
      </div>
    );
  }

  const {
    score = 0,
    summary = "",
    strengths = [],
    improvements = [],
    insights = [],
  } = feedback;

  const scoreColor =
    score >= 7 ? "bg-green-500" : score >= 4 ? "bg-yellow-400" : "bg-red-500";

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* 🎉 Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">🎉 Interview Completed</h1>
          <p className="text-gray-600">Here’s how you performed</p>
        </div>

        {/* 🔢 Score */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Overall Score</span>
            <span className="font-bold">{score} / 10</span>
          </div>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full ${scoreColor}`}
              style={{ width: `${score * 10}%` }}
            />
          </div>
        </div>

        {/* 🧾 Summary */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Key Summary</h2>
          <p className="text-gray-700 leading-relaxed">{summary}</p>
        </section>

        {/* 💪 Strengths */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Strengths</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {strengths.length > 0 ? (
              strengths.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No strong areas identified</li>
            )}
          </ul>
        </section>

        {/* 🔧 Improvements */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Areas to Improve</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {improvements.length > 0 ? (
              improvements.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No major improvements suggested</li>
            )}
          </ul>
        </section>

        {/* 🧠 Insights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Interview Insights</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {insights.length > 0 ? (
              insights.map((item, i) => <li key={i}>{item}</li>)
            ) : (
              <li>No additional insights available</li>
            )}
          </ul>
        </section>

        {/* 🔁 CTA */}
        <div className="text-center">
          <Button onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
