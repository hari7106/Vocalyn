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

      <div className="mt-4 flex w-full max-w-xs flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Button className="w-full sm:w-auto" onClick={() => router.push("/dashboard") }>
          Back to Dashboard
        </Button>

        <Button variant="outline" className="w-full sm:w-auto" onClick={() => router.push("/dashboard/interview") }>
          Learn Again
        </Button>
      </div>
    </div>
  );
}
