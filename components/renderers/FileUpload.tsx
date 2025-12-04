"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileQuestion } from "../Question/types";

interface Props {
  question: FileQuestion;
  answer: File | null;
  onChange: (value: File | null) => void;
}

export default function FileUpload({ question, answer, onChange }: Props) {
  const [fileName, setFileName] = useState(answer?.name || "");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    setFileName(file?.name || "");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-3 p-4 border rounded-xl shadow-lg bg-gray-800 border-gray-700"
    >
      {/* Question */}
      <div
        className="text-lg font-semibold text-gray-300"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />

      {/* File Input */}
      <label className="flex items-center justify-center px-4 py-2 bg-gray-700 text-gray-200 rounded-lg cursor-pointer hover:bg-gray-600 transition-colors">
        Choose File
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* Selected File Name */}
      {fileName && (
        <p className="text-gray-300 text-sm">Selected file: {fileName}</p>
      )}

      {/* Max Size Hint */}
      {question.maxSizeMB && (
        <p className="text-gray-400 text-xs">
          Max size: {question.maxSizeMB} MB
        </p>
      )}
    </motion.div>
  );
}
