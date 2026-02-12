"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/services/supabaseClient";
import { useUser } from "@/app/context/UserDetailContext";

export default function FeedbackPage() {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const { userEmail } = useUser();

  useEffect(() => {
    async function loadFeedback() {
      try {
        // 🧠 transcript already saved by you
        const transcript = JSON.parse(
          sessionStorage.getItem("interviewTranscript") || "[]"
        );

        const res = await fetch("/api/feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript }),
        });

        if (!res.ok) {
          throw new Error("Failed to fetch feedback");
        }

        const data = await res.json();
        setFeedback(data);
        
        // Save interview to database
        await saveInterviewToDatabase(data, transcript);
      } catch (err) {
        console.error(err);
        setError("Unable to generate feedback");
      } finally {
        setLoading(false);
      }
    }

    loadFeedback();
  }, []);

  const saveInterviewToDatabase = async (feedbackData, transcript) => {
    try {
      setSaving(true);
      const config = JSON.parse(sessionStorage.getItem("interviewConfig") || "{}");
      
      const { error } = await supabase
        .from("interviews")
        .insert([
          {
            user_email: userEmail,
            job_position: config.jobPosition,
            job_description: config.jobDescription,
            interview_type: config.interviewType?.join(", "),
            duration: config.duration,
            score: feedbackData.score,
            summary: feedbackData.summary,
            strengths: feedbackData.strengths,
            improvements: feedbackData.improvements,
            insights: feedbackData.insights,
            transcript: transcript,
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) {
        console.error("Error saving interview:", error);
      }
    } catch (err) {
      console.error("Error saving to database:", err);
    } finally {
      setSaving(false);
    }
  };

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
    score >= 7
      ? "bg-green-500"
      : score >= 4
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* 🎉 Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            🎉 Interview Completed
          </h1>
          <p className="text-gray-600">
            Here’s how you performed
          </p>
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
          <h2 className="text-xl font-semibold mb-2">
            Key Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {summary}
          </p>
        </section>

        {/* 💪 Strengths */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Strengths
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {strengths.length > 0 ? (
              strengths.map((item, i) => (
                <li key={i}>{item}</li>
              ))
            ) : (
              <li>No strong areas identified</li>
            )}
          </ul>
        </section>

        {/* 🔧 Improvements */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Areas to Improve
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {improvements.length > 0 ? (
              improvements.map((item, i) => (
                <li key={i}>{item}</li>
              ))
            ) : (
              <li>No major improvements suggested</li>
            )}
          </ul>
        </section>

        {/* 🧠 Insights */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Interview Insights
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            {insights.length > 0 ? (
              insights.map((item, i) => (
                <li key={i}>{item}</li>
              ))
            ) : (
              <li>No additional insights available</li>
            )}
          </ul>
        </section>

        {/* 🔁 CTA */}
        <div className="text-center">
          <Button onClick={() => window.location.href = "/dashboard"}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
