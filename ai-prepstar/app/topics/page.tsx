"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Code, Users, Lightbulb, Zap, Target, Building2, ArrowRight } from "lucide-react";

export default function TopicsPage() {
  const router = useRouter();

  const topicCategories = [
    {
      icon: Code,
      category: "Technical Fundamentals",
      items: ["Data Structures", "Algorithms", "System Design", "Databases", "APIs"],
      color: "from-blue-500 to-cyan-500",
      description: "Core programming and architecture concepts",
    },
    {
      icon: Users,
      category: "Behavioral Questions",
      items: ["Tell me about yourself", "Leadership", "Conflict Resolution", "Time Management", "Career Goals"],
      color: "from-purple-500 to-pink-500",
      description: "Soft skills and interpersonal abilities",
    },
    {
      icon: Lightbulb,
      category: "Problem Solving",
      items: ["Coding Challenges", "Case Studies", "Logic Puzzles", "Debugging", "Optimization"],
      color: "from-amber-500 to-orange-500",
      description: "Critical thinking and analytical skills",
    },
    {
      icon: Zap,
      category: "Industry-Specific",
      items: ["Cloud Platforms", "Mobile Development", "Web Technologies", "AI/ML", "Security"],
      color: "from-green-500 to-emerald-500",
      description: "Specialized technology domains",
    },
    {
      icon: Target,
      category: "Soft Skills",
      items: ["Communication", "Teamwork", "Adaptability", "Problem-solving", "Initiative"],
      color: "from-rose-500 to-pink-500",
      description: "Professional development competencies",
    },
    {
      icon: Building2,
      category: "Company Culture",
      items: ["Values Alignment", "Company Mission", "Growth Opportunities", "Work Environment", "Team Dynamics"],
      color: "from-indigo-500 to-purple-500",
      description: "Organizational fit and culture",
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
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">VocaLyn</h1>
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
            📚 Comprehensive Learning Path
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Interview
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Topics
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Master diverse interview topics and demonstrate expertise across technical and behavioral domains.
          </p>
        </motion.div>

        {/* TOPICS GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {topicCategories.map((topic, index) => {
            const Icon = topic.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group h-full"
              >
                <div className="relative h-full">
                  {/* Background glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${topic.color} opacity-0 group-hover:opacity-10 blur-2xl rounded-2xl transition-opacity duration-300`} />
                  
                  {/* Card */}
                  <div className="relative h-full rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 hover:border-slate-700 transition-all duration-300 flex flex-col cursor-pointer group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                    {/* Icon with gradient */}
                    <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${topic.color} text-white`}>
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-semibold text-white">{topic.category}</h3>
                    <p className="mb-4 text-xs text-slate-400">{topic.description}</p>
                    
                    {/* Items */}
                    <div className="flex-1 space-y-2">
                      {topic.items.map((item, i) => (
                        <div key={i} className="flex items-start">
                          <span className="mr-2 text-indigo-400 font-bold">•</span>
                          <span className="text-sm text-slate-300">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block rounded-2xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-1 border border-indigo-500/30">
            <div className="rounded-xl bg-slate-900/80 px-8 py-6">
              <h3 className="text-2xl font-bold mb-3">Ready to master these topics?</h3>
              <p className="text-slate-400 mb-6">Begin your comprehensive interview preparation journey today.</p>
              <Button
                onClick={() => router.push("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Start Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
