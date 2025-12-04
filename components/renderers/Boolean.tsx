"use client";

import React from "react";
import { BooleanQuestion } from "../Question/types";

interface Props {
  question: BooleanQuestion;
  answer: boolean | null;
  onChange: (value: boolean) => void;
}

export default function BooleanField({ question, answer = null, onChange }: Props) {
  const options = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const colors = ["bg-indigo-700", "bg-pink-700"];

  return (
    <div className="space-y-4 p-4 border rounded-xl shadow-lg bg-gray-800 border-gray-700">
      {/* Question */}
      <div
        className="text-lg font-semibold text-gray-300"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* Options */}
      <div className="flex gap-4">
        {options.map((opt, index) => {
          const isSelected = answer === opt.value;
          const color = colors[index % colors.length];

          return (
            <div
              key={opt.label}
              onClick={() => onChange(opt.value)}
              className={`flex items-center justify-center px-5 py-2 rounded-lg cursor-pointer
                text-gray-200 font-semibold transition-transform transform hover:scale-105
                ${isSelected ? color : "bg-gray-700"}
              `}
            >
              {opt.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
