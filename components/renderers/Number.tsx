"use client";

import React from "react";
import { motion } from "framer-motion";
import { NumberQuestion } from "../Question/types";

interface Props {
  question: NumberQuestion;
  answer: number | null;
  onChange: (value: number) => void;
}

export default function NumberField({ question, answer, onChange }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-gray-800 rounded-xl shadow-lg border border-gray-700 space-y-3"
    >
      {/* Question */}
      <p
        className="font-semibold text-gray-300 text-lg"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* Number Input */}
      <motion.input
        type="number"
        value={answer ?? ""}
        min={question.min}
        max={question.max}
        onChange={(e) => onChange(Number(e.target.value))}
        whileFocus={{ scale: 1.02, boxShadow: "0 0 10px rgba(79,70,229,0.4)" }}
        className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        placeholder={`Enter a number (${question.min} - ${question.max})`}
      />

      {/* Min/Max Hint */}
      {question.min !== undefined && question.max !== undefined && (
        <p className="text-gray-400 text-sm">
          Min: {question.min}, Max: {question.max}
        </p>
      )}
    </motion.div>
  );
}
