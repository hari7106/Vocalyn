"use client";

import React from "react";
import { Video, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

function Create() {
  const router = useRouter();

  return (
    <div className="mt-6 w-full">
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">

        {/* Card 1 */}
        <div
          onClick={() => router.push("/dashboard/interview")}
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm
                     transition-all hover:scale-[1.02] hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
            <Video className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">New Interview</h2>
            <p className="text-sm text-gray-500">
              Start an AI-driven interview
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div
          onClick={() => router.push("/dashboard/tutor")}
          className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 bg-white px-6 py-5 shadow-sm
                     transition-all hover:scale-[1.02] hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-primary">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Tutor Mode</h2>
            <p className="text-sm text-gray-500">
              Learn and practice with AI feedback
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Create;
