"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EndScreen() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50">
      <Image src="/good-job.png" width={180} height={180} alt="Done" />
      <h1 className="text-3xl font-bold">Session Completed ⭐</h1>
      <p className="text-gray-600">Great job completing the Learning Session!</p>

      <Button onClick={() => router.push("/dashboard")}>
        Back to Dashboard!
      </Button>
        <Button onClick={() => router.push("/dashboard/interview")}>
         Test Your Skills
      </Button>
    </div>
  );
}
