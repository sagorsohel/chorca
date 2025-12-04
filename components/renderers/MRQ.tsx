"use client";

import React from "react";
import { MRQQuestion } from "../Question/types";

// Utility to convert HTML to plain text
const renderHTML = (html: string | null) => {
  if (!html) return null;
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

interface Props {
  question: MRQQuestion;
  answer: string[];
  onChange: (value: string[]) => void;
}

export default function MRQ({ question, answer = [], onChange }: Props) {
  const labels = ["A", "B", "C", "D", "E"];
  const colors = ["bg-indigo-700", "bg-green-700", "bg-yellow-700", "bg-pink-700", "bg-purple-700"];

  const toggle = (val: string) => {
    if (answer.includes(val)) {
      onChange(answer.filter((v) => v !== val));
    } else {
      onChange([...answer, val]);
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
          const isSelected = answer.includes(opt.value);
          const color = colors[index % colors.length];
          const label = labels[index] || "";

          return (
            <div
              key={opt.value}
              onClick={() => toggle(opt.value)}
              className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-transform transform hover:scale-105
                ${isSelected ? color : "bg-gray-700"}
                ${isSelected ? "border-gray-500" : "border-gray-600"}
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
