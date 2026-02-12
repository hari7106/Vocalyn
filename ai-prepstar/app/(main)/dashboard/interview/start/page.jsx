"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";

const ASSISTANT_ID = "ca6f6a72-305a-4916-b80c-6c9d95b09dfd";

export default function StartInterviewPage() {
  // ✅ Hooks only at top level
  const router = useRouter();

  const vapiRef = useRef(null);
  const configRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // 🔹 NEW: transcript collector
  const transcriptRef = useRef([]);

  const [started, setStarted] = useState(false);
  const [status, setStatus] = useState("Idle");

  /* -------------------------------------------------------
     Load interview config
  ------------------------------------------------------- */
  useEffect(() => {
    const stored = sessionStorage.getItem("interviewConfig");
    if (stored) {
      configRef.current = JSON.parse(stored);
    }
  }, []);

  /* -------------------------------------------------------
     Camera init
  ------------------------------------------------------- */
  useEffect(() => {
    async function initCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera error:", err);
      }
    }

    initCamera();
  }, []);

  /* -------------------------------------------------------
     Vapi init
  ------------------------------------------------------- */
  useEffect(() => {
    vapiRef.current = new Vapi(
      process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
    );

    // ✅ Capture messages (IMPORTANT)
    vapiRef.current.on("message", (msg) => {
      if (msg?.role && msg?.content) {
        transcriptRef.current.push({
          role: msg.role,
          content: msg.content,
        });
      }
    });

    vapiRef.current.on("call-start", async () => {
      setStatus("Interview started");

      const cfg = configRef.current;
      if (!cfg) return;

      await vapiRef.current.send({ type: "control", action: "pause" });

      await vapiRef.current.send({
        type: "message",
        role: "user",
        content: `
You are Vocalyn, a professional AI interviewer.

JOB ROLE:
${cfg.jobPosition}

JOB DESCRIPTION:
${cfg.jobDescription}

ALLOWED INTERVIEW TYPES:
${cfg.interviewType?.join(", ")}

DURATION:
${cfg.duration} minutes

RULES:
- Ask only relevant questions
- One question at a time
- Wait for answer
- Increase difficulty
- End politely

Start with the FIRST question now.
        `,
      });

      await vapiRef.current.send({ type: "control", action: "resume" });
    });

    vapiRef.current.on("call-end", () => {
      setStatus("Interview ended");
      setStarted(false);
    });

    vapiRef.current.on("error", (e) => {
      console.error("VAPI ERROR:", e);
      setStatus("Vapi error");
      setStarted(false);
    });

    return () => {
      vapiRef.current?.stop();
    };
  }, []);

  /* -------------------------------------------------------
     Controls
  ------------------------------------------------------- */
  const startInterview = async () => {
    try {
      setStarted(true);
      setStatus("Starting interview...");
      transcriptRef.current = []; // reset
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (err) {
      console.error("START FAILED:", err);
      setStatus("Failed to start");
      setStarted(false);
    }
  };

  const stopInterview = () => {
    vapiRef.current?.stop();
    setStarted(false);
    setStatus("Interview ended");

    // ✅ SAVE TRANSCRIPT FOR FEEDBACK PAGE
    sessionStorage.setItem(
      "interviewTranscript",
      JSON.stringify(transcriptRef.current)
    );

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }

    // ✅ SAFE ROUTING
    router.push("/dashboard/interview/end");
  };

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <h1 className="text-3xl font-bold text-center py-6">
        AI Interview
      </h1>

      <p className="text-center text-gray-600 mb-4">
        {status}
      </p>

      <div className="flex flex-1 gap-6 px-8">
        {/* AI Avatar */}
        <div className="flex-1 bg-white rounded-xl shadow flex flex-col items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6997/6997662.png"
            className="w-48 h-48 rounded-full mb-4"
            alt="Vocalyn"
          />
          <h2 className="text-xl font-semibold">Vocalyn</h2>
          <p className="text-gray-500 text-sm">AI Interviewer</p>
        </div>

        {/* User Video */}
        <div className="flex-1 bg-black rounded-xl overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 py-6">
        <Button onClick={startInterview} disabled={started}>
          Start Interview
        </Button>

        <Button
          variant="outline"
          onClick={stopInterview}
          disabled={!started}
        >
          Stop Interview
        </Button>
      </div>
    </div>
  );
}
