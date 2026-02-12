import React, { useEffect, useState } from "react";

function Feedback({ transcript }) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    fetch("/api/feedback", {
      method: "POST",
      body: JSON.stringify({ transcript }),
    })
      .then((res) => res.json())
      .then((data) => setFeedback(data.feedback));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Interview Feedback
      </h2>
      <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
        {feedback}
      </pre>
    </div>
  );
}

export default Feedback;
