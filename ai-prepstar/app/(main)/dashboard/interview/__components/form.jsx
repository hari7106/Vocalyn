"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

import { Code2, Users, Puzzle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

function Form({ handleInputChange, onGenerate }) {
  const [types, setTypes] = useState([]);
  const router = useRouter();

  const interviewTypes = [
    { id: "technical", label: "Technical", icon: Code2 },
    { id: "behavioural", label: "Behavioural", icon: Users },
    { id: "problem", label: "Problem Solving", icon: Puzzle },
    { id: "experience", label: "Experience", icon: Briefcase },
  ];

  const toggleType = (id) => {
    setTypes((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((t) => t !== id)
        : [...prev, id];

      // ✅ pass selected interview types to parent
      handleInputChange("interviewType", updated);

      return updated;
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      {/* Job Position */}
      <div>
        <h2 className="text-sm font-medium text-gray-700">Job Position</h2>
        <Input
          placeholder="e.g. Software Engineer"
          className="mt-2"
          onChange={(e) => handleInputChange("jobPosition", e.target.value)}
        />
      </div>

      {/* Job Description */}
      <div className="mt-5">
        <h2 className="text-sm font-medium text-gray-700">Job Description</h2>
        <Input
          placeholder="Enter detailed job description"
          className="mt-2"
          onChange={(e) => handleInputChange("jobDescription", e.target.value)}
        />
      </div>

      {/* Duration */}
      <div className="mt-5">
        <h2 className="text-sm font-medium text-gray-700">Duration</h2>
        <Select onValueChange={(value) => handleInputChange("duration", value)}>
          <SelectTrigger className="mt-2 w-full">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 minutes</SelectItem>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
            <SelectItem value="90">90 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Interview Type */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-medium text-gray-700">
          Interview Type
        </h2>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {interviewTypes.map(({ id, label, icon: Icon }) => {
            const active = types.includes(id);

            return (
              <div
                key={id}
                onClick={() => toggleType(id)}
                className={`
                  group flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-4 text-center transition-all
                  ${
                    active
                      ? "border-indigo-600 bg-indigo-100 text-indigo-700 ring-2 ring-indigo-400 shadow-md scale-[1.03]"
                      : "border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50"
                  }
                `}
              >
                <Icon
                  className={`h-6 w-6 transition-colors ${
                    active ? "text-indigo-700" : "text-gray-600"
                  }`}
                />
                <span
                  className={`text-sm font-semibold ${
                    active ? "text-indigo-700" : "text-gray-800"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        className="mt-8 w-full"
        onClick={() => {
          onGenerate();
          router.push("/dashboard/interview/start");
        }}
      >
        Generate Interview
      </Button>
    </div>
  );
}

export default Form;
