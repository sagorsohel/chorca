"use client";

import React from "react";
import { motion } from "framer-motion";
import { DropdownQuestion } from "../Question/types";

interface Props {
  question: DropdownQuestion;
  answer: string;
  onChange: (value: string) => void;
}

// Helper to convert HTML to plain text
const stripHtml = (html: string | null) => {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};

export default function Dropdown({ question, answer, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-900 space-y-3"
    >
      {/* Question */}
      <p
        className="font-semibold text-gray-300 text-lg"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* Dropdown */}
      <motion.select
        value={answer || ""}
        onChange={(e) => onChange(e.target.value)}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(79,70,229,0.4)" }}
        className="w-full p-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
      >
        <option value="" className="bg-gray-700 text-gray-300">
          Select
        </option>
        {question.options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-gray-700 text-gray-300"
          >
            {stripHtml(opt.label)}
          </option>
        ))}
      </motion.select>
    </motion.div>
  );
}
