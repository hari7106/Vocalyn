"use client";

import React from "react";
import { vapi } from "@/lib/vapi";
import { buildInterviewPrompt } from "@/lib/prompts";
import { Button } from "@/components/ui/button";

function InterviewUI({ callActive, transcript }) {
  const formdata = JSON.parse(localStorage.getItem("interviewForm"));

  const startInterview = async () => {
    await vapi.start({
      model: {
        provider: "openai",
        model: "gpt-4o-realtime-preview",
        systemPrompt: buildInterviewPrompt(formdata),
      },
      voice: {
        provider: "11labs",
        voiceId: "Rachel",
      },
    });
  };

  const endInterview = () => {
    vapi.stop();
  };

  return (
    <div className="flex h-screen">
      {/* Video Area */}
      <div className="flex-1 bg-black flex items-center justify-center text-white">
        <video autoPlay muted className="rounded-xl w-2/3">
          <source src="/ai-avatar.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Control Panel */}
      <div className="w-[420px] border-l p-6 flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Live Interview</h2>

        <div className="flex-1 overflow-y-auto space-y-2 text-sm">
          {transcript.map((t, i) => (
            <p key={i}>
              <b>{t.role}:</b> {t.text}
            </p>
          ))}
        </div>

        {!callActive ? (
          <Button onClick={startInterview} className="mt-4">
            Start Interview
          </Button>
        ) : (
          <Button onClick={endInterview} variant="destructive" className="mt-4">
            End Interview
          </Button>
        )}
      </div>
    </div>
  );
}

export default InterviewUI;
