"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Vapi from "@vapi-ai/web";
import { Button } from "@/components/ui/button";

const ASSISTANT_ID = "ad29b23d-a6b2-48ee-a643-fa8da93a72bc";

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
  const [cameraError, setCameraError] = useState(null);

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
        setCameraError(null);
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
        setCameraError(err?.message || "Camera access denied");
      }
    }

    initCamera();
  }, []);

  /* -------------------------------------------------------
     Vapi init
  ------------------------------------------------------- */
  useEffect(() => {
    vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

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
      JSON.stringify(transcriptRef.current),
    );

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }

    // ✅ SAFE ROUTING
    router.push("/dashboard/interview/ends");
  };

  const retryCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      setCameraError(err?.message || "Camera access denied");
    }
  };

  /* -------------------------------------------------------
     UI
  ------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <h1 className="text-3xl font-bold text-center py-6">AI Tutor</h1>

      <p className="text-center text-gray-600 mb-4">{status}</p>

      <div className="flex flex-1 gap-6 px-8">
        {/* AI Avatar */}
        <div className="flex-1 bg-white rounded-xl shadow flex flex-col items-center justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5310/5310913.png"
            className="w-48 h-48 rounded-full mb-4"
            alt="Vocalyn"
          />
          <h2 className="text-xl font-semibold">Valeon</h2>
          <p className="text-gray-500 text-sm">AI Tutor</p>
        </div>

        {/* User Video */}
        <div className="flex-1 bg-black rounded-xl overflow-hidden">
          <div className="relative h-72 md:h-full">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            {cameraError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-4">
                <p className="mb-3 text-center">Camera error: {cameraError}</p>
                <div className="flex gap-3">
                  <Button onClick={retryCamera}>Retry Camera</Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push("/auth")}
                  >
                    Use Voice Only
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 py-6">
        <Button onClick={startInterview} disabled={started}>
          Start Learning
        </Button>

        <Button variant="outline" onClick={stopInterview} disabled={!started}>
          End
        </Button>
      </div>
    </div>
  );
}
