"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/app/services/supabaseClient";

const images = [
  "/download.png",
  "/hero22.png",
  "/hr.png",
  "/shake.png",
];

export default function Hero() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [index, setIndex] = useState(0);

  /* 🔐 Check auth ONCE correctly */
  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data }) => {
        setIsLoggedIn(!!data.session);
      })
      .catch((error) => {
        console.error('Auth session check failed:', error);
        setIsLoggedIn(false); // Default to not logged in on error
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* 🔁 Image slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  if (isLoggedIn === null) return null; // prevents flicker

  return (
    <div className="relative mx-auto my-16 max-w-7xl px-4">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-1/3 left-20 h-[400px] w-[400px] rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-[400px] w-[400px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Headline */}
      <h1 className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-700 md:text-6xl">
        Ace Any Interview With{" "}
        <span
  className="relative text-indigo-500
  drop-shadow-[0_0_10px_rgba(99,102,241,0.6)]
  dark:drop-shadow-[0_0_14px_rgba(99,102,241,0.8)]"
>
  VocaLyn
</span>

      </h1>

      <p className="mx-auto mt-4 max-w-xl text-center text-lg text-neutral-600">
        Practice real interviews, get instant voice feedback, and level up fast.
      </p>

      {/* CTA */}
    <div className="mt-8 flex justify-center gap-4">
  <Button
    onClick={() => router.push(isLoggedIn ? "/dashboard" : "/auth")}
    className="
      relative overflow-hidden
      transition-all duration-300
      hover:scale-105
      hover:shadow-[0_0_25px_rgba(99,102,241,0.45)]
      active:scale-95
    "
  >
    Explore Now
  </Button>

  <Button
    variant="outline"
    onClick={() => router.push("/about")}
    className="
      transition-all duration-300
      hover:scale-105
      hover:border-black
      hover:text-black
      hover:shadow-[0_0_18px_rgba(99,102,241,0.25)]
      active:scale-95
    "
  >
    About Us
  </Button>
</div>


      {/* Slider + Waveforms */}
      <div className="relative mt-20 flex items-center justify-center">
        <Waveform side="left" />

        <div className="relative h-[280px] w-[520px] overflow-hidden rounded-2xl border bg-neutral-100 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={images[index]}
                alt="preview"
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <Waveform side="right" />
      </div>

      {/* Feature cards */}
      <div className="mt-24 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <FeatureCard
          title="Dashboard"
          desc="Track interviews & progress"
          icon="📊"
          onClick={() =>
            router.push(isLoggedIn ? "/dashboard" : "/auth")
          }
        />

        <FeatureCard
          title="Roles"
          desc="Role-based interview prep"
          icon="🎯"
          onClick={() => router.push("/roles")}
        />

        <FeatureCard
          title="How to Use?"
          desc="Simple guided flow"
          icon="🧭"
          onClick={() => router.push("/how")}
        />

        <FeatureCard
          title="Topics"
          desc="Interview topics library"
          icon="📚"
          onClick={() => router.push("/topics")}
        />
      </div>
    </div>
  );
}

/* Waveform */
function Waveform({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute ${
        side === "left" ? "-left-36" : "-right-36"
      }`}
    >
      <div className="relative h-64 w-64">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.4, opacity: 0.6 }}
            animate={{ scale: 1.4, opacity: 0 }}
            transition={{
              duration: 2.5,
              delay: i * 0.6,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full border-2 border-black/40"
          />
        ))}
      </div>
    </div>
  );
}

/* Feature Card */
function FeatureCard({
  title,
  desc,
  icon,
  onClick,
}: {
  title: string;
  desc: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      onClick={onClick}
      className="cursor-pointer flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-xl">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-neutral-500">{desc}</p>
      </div>
    </motion.div>
  );
}
