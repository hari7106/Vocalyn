"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Headphones,
  BarChart3,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function HowItWorksPage() {
  const router = useRouter();

  const steps = [
    {
      icon: Zap,
      title: "Create Your Interview",
      description:
        "Choose your role, job description, and interview type. Customize duration and difficulty level.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Headphones,
      title: "Practice with AI",
      description:
        "Get interviewed by VocaLyn, our advanced AI interviewer. Get natural conversation and real-time feedback.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      title: "Receive Detailed Feedback",
      description:
        "Get comprehensive analysis of your performance with scores, strengths, and areas to improve.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "Track Progress",
      description:
        "Keep all previous interviews saved and monitor your improvement over time.",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      {/* 🌌 Ambient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/30 blur-[140px]" />
        <div className="absolute top-1/3 left-16 h-[420px] w-[420px] rounded-full bg-sky-500/25 blur-[140px]" />
        <div className="absolute bottom-24 right-24 h-[420px] w-[420px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
      </div>

      {/* HEADER */}
      <div className="relative z-20 border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            VocaLyn
          </h1>
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            className="hover:bg-slate-800 group"
          >
            <ArrowRight className="h-4 w-4 mr-2 group-hover:-rotate-180 transition-transform" />
            Back
          </Button>
        </div>
      </div>

      {/* HERO */}
      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-indigo-500/10 border border-indigo-500/30 rounded-full text-sm text-indigo-300 mb-6">
            ✨ Master Your Interview Skills
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            How It
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Works
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Four powerful steps to transform your interview confidence and ace
            any technical or behavioral question.
          </p>
        </motion.div>

        {/* STEPS WITH CONNECTING LINE */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-purple-500/50 to-pink-500/0 transform -translate-y-1/2" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative">
                    {/* Background glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-20 blur-2xl rounded-2xl transition-opacity duration-300`}
                    />

                    {/* Card */}
                    <div className="relative rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-8 hover:border-slate-700 transition-all duration-300 h-full flex flex-col">
                      {/* Number badge */}
                      <div
                        className={`mb-4 h-12 w-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {index + 1}
                      </div>

                      {/* Icon */}
                      <div
                        className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white/90`}
                      >
                        <Icon className="h-7 w-7" />
                      </div>

                      {/* Content */}
                      <h3 className="mb-3 text-xl font-semibold text-white">
                        {step.title}
                      </h3>
                      <p className="flex-1 text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-24 text-center"
        >
          <div className="inline-block rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-1 border border-indigo-500/30">
            <div className="rounded-xl bg-slate-900/80 px-8 py-6">
              <h3 className="text-2xl font-bold mb-3">
                Ready to ace your interviews?
              </h3>
              <p className="text-slate-400 mb-6">
                Start practicing now and build the confidence you need.
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Start Your Interview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
