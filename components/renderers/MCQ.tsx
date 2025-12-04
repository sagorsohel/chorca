"use client";

import React, { useState } from "react";
import { MCQQuestion } from "../Question/types";

// Utility to strip HTML to plain text
const renderHTML = (html: string | null) => {
  if (!html) return null;
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

interface Props {
  question: MCQQuestion;
  answer: string | null;
  onChange: (value: string) => void;
}

export default function MCQ({ question, answer, onChange }: Props) {
  const [locked, setLocked] = useState(false);

  const labels = ["A", "B", "C", "D"];
  const colors = ["bg-indigo-700", "bg-green-700", "bg-yellow-700", "bg-pink-700"];

  const handleSelect = (value: string) => {
    if (!locked) {
      onChange(value);
      setLocked(true);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl shadow-lg bg-gray-800 border-gray-700">
      {/* Question */}
      <div className="text-lg font-semibold text-gray-300">
        <span dangerouslySetInnerHTML={{ __html: question.question }} />
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((opt, index) => {
          const isSelected = answer === opt.value;
          const color = colors[index % colors.length];
          const label = labels[index] || "";

          return (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-transform transform hover:scale-105
                ${isSelected ? color : "bg-gray-700"}
                ${isSelected ? "border-gray-500" : "border-gray-600"}
                ${locked && !isSelected ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {/* ABCD label */}
              <div className="font-bold text-gray-200 w-6 h-6 flex items-center justify-center rounded-full border border-gray-500">
                {label}
              </div>
              <div className="text-gray-300">{renderHTML(opt.label)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
