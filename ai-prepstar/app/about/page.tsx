"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  const router = useRouter();

  return (
    <div
      className="relative min-h-screen overflow-hidden 
      bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100"
    >
      {/* 🌌 Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute -top-40 left-1/2 h-[520px] w-[520px] 
          -translate-x-1/2 rounded-full bg-indigo-500/30 blur-[140px]"
        />
        <div
          className="absolute top-1/3 left-16 h-[420px] w-[420px] 
          rounded-full bg-sky-500/25 blur-[140px]"
        />
        <div
          className="absolute bottom-24 right-24 h-[420px] w-[420px] 
          rounded-full bg-fuchsia-500/20 blur-[140px]"
        />
      </div>

      {/* HERO */}
      <div className="relative h-[38vh] w-full overflow-hidden">
        <Image
          src="/final.jpg"
          alt="About VocaLyn"
          fill
          priority
          className="object-cover"
        />

        <div
          className="absolute inset-0 
          bg-gradient-to-b from-black/70 via-black/50 to-slate-950"
        />

        <div className="relative z-10 flex h-full items-end px-12 pb-10">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl text-4xl font-bold md:text-6xl"
          >
            Designed for confidence.
            <span className="block text-white">Built for real interviews.</span>
          </motion.h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-12 py-20">
        {/* Intro */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[120px_1fr]">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Image
              src="/logo.svg"
              alt="VocaLyn"
              width={96}
              height={96}
              className="drop-shadow-[0_0_35px_rgba(99,102,241,0.55)]"
            />
          </motion.div>

          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="max-w-3xl text-lg leading-relaxed text-slate-300"
          >
            VocaLyn is an AI-powered interview preparation platform built around
            one simple idea — interviews are spoken, not written. Instead of
            memorizing answers, you practice real conversations, receive
            intelligent feedback, and improve how you actually sound.
          </motion.p>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Voice-first practice",
              desc: "Practice aloud in real interview scenarios. Think, pause, and respond naturally.",
              icon: "🎙️",
            },
            {
              title: "Instant AI feedback",
              desc: "Clarity, tone, confidence, structure — analyzed immediately.",
              icon: "⚡",
            },
            {
              title: "Role-based prep",
              desc: "Tailored interviews for specific roles and experience levels.",
              icon: "🎯",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.03 }}
              className="rounded-2xl border border-white/10 
                bg-white/5 p-6 shadow-xl backdrop-blur"
            >
              <div className="mb-4 text-3xl">{item.icon}</div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Vision */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 max-w-3xl"
        >
          <h2 className="text-2xl font-semibold">Our vision</h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">
            Interviews shouldn’t feel like memory tests. They should feel like
            conversations you walk into confidently. VocaLyn helps you sound
            clearer, calmer, and more confident every time you speak.
          </p>
        </motion.div>

        {/* Back */}
        <div className="mt-16">
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="group border-white/20 text-black
              hover:border-black hover:text-black"
          >
            <span className="mr-2 transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
