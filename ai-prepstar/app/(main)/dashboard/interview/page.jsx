"use client";
import React, { useState } from "react";
import Form from "./__components/form";

export default function InterviewPage() {
  const [formData, setFormData] = useState({});

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateInterview = () => {
    sessionStorage.setItem(
      "interviewConfig",
      JSON.stringify(formData)
    );
  };

  return (
    <div className="px-6 md:px-20 lg:px-32 py-8">
      <Form
        handleInputChange={handleInputChange}
        onGenerate={handleGenerateInterview}
      />
    </div>
  );
}
