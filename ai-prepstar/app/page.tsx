import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

export default function Home() {
  return (
<div>
  <Header />
  <Hero />
  <footer className="mt-12 border-t border-slate-800 py-6 text-center text-sm text-black">
    © {new Date().getFullYear()} VocaLyn — All rights reserved.
  </footer>
</div>

  );
}
