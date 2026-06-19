"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {
  Code2,
  Server,
  Layers,
  Brain,
  Settings,
  Briefcase,
  ArrowRight,
} from "lucide-react";

export default function RolesPage() {
  const router = useRouter();

  const roles = [
    {
      icon: Code2,
      title: "Frontend Developer",
      skills: ["React", "Vue", "Angular", "HTML/CSS", "JavaScript"],
      description: "Master UI/UX implementation and component development.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Server,
      title: "Backend Engineer",
      skills: ["Node.js", "Python", "Java", "Databases", "APIs"],
      description: "Prepare for system design and API architecture questions.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Layers,
      title: "Full Stack Developer",
      skills: ["Frontend", "Backend", "Databases", "DevOps", "Cloud"],
      description: "Comprehensive interview prep for full-stack positions.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Brain,
      title: "Data Scientist",
      skills: ["Python", "ML", "Statistics", "SQL", "Data Viz"],
      description: "Focus on machine learning concepts and data analysis.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Settings,
      title: "DevOps Engineer",
      skills: ["Docker", "Kubernetes", "CI/CD", "Cloud", "Linux"],
      description: "Practice infrastructure and deployment scenarios.",
      color: "from-indigo-500 to-purple-500",
    },
    {
      icon: Briefcase,
      title: "Product Manager",
      skills: ["Product Strategy", "Analytics", "User Research", "Roadmap"],
      description: "Prepare for product thinking and case interview questions.",
      color: "from-rose-500 to-pink-500",
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
            🎯 Choose Your Career Path
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Interview
            <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Roles
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Choose the role that matches your career goals and practice targeted
            interview questions designed for professionals like you.
          </p>
        </motion.div>

        {/* ROLES GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role, index) => {
            const Icon = role.icon;
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
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-0 group-hover:opacity-10 blur-2xl rounded-2xl transition-opacity duration-300`}
                  />

                  {/* Card */}
                  <div className="relative h-full rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 hover:border-slate-700 transition-all duration-300 flex flex-col cursor-pointer group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
                    {/* Icon with gradient */}
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${role.color} text-white`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {role.title}
                    </h3>
                    <p className="mb-4 flex-1 text-slate-400 text-sm leading-relaxed">
                      {role.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {role.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-slate-800/60 text-slate-300 rounded-full hover:bg-slate-700 transition-colors"
                        >
                          {skill}
                        </span>
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
              <h3 className="text-2xl font-bold mb-3">
                Find your perfect role
              </h3>
              <p className="text-slate-400 mb-6">
                Start practicing with role-specific questions today.
              </p>
              <Button
                onClick={() => router.push("/dashboard")}
                size="lg"
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300"
              >
                Start Practice
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
