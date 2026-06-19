"use client";
import { Briefcase, Calendar, Camera, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";

function Latest() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vocalyn_interviews");
      if (stored) {
        setInterviews(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load interviews from localStorage:", err);
    }
  }, []);
  return (
    <div className="my-5">
      <h2 className="font-semibold text-2xl">Previous Interviews</h2>

      {interviews.length === 0 ? (
        <div className="p-5 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg mt-4 h-48">
          <Camera className="h-12 w-12 text-gray-400" />
          <h3 className="text-gray-500 mt-2">No previous interviews</h3>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {interviews.map((interview) => (
            <div
              key={interview.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {interview.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <Calendar className="h-4 w-4" />
                {interview.date}
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-green-600">
                <TrendingUp className="h-4 w-4" />
                Score: {interview.score}/10
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Latest;
