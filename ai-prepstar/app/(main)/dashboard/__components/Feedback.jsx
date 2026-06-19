import React, { useEffect, useState } from "react";

function Feedback({ transcript }) {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!transcript) {
      setFeedback("");
      return;
    }

    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transcript }),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(new Error("Network response was not ok")),
      )
      .then((data) => setFeedback(data.feedback ?? JSON.stringify(data)))
      .catch(() => setFeedback("Error fetching feedback"));
  }, [transcript]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Interview Feedback</h2>
      <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
        {feedback}
      </pre>
    </div>
  );
}

export default Feedback;
