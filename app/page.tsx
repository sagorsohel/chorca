"use client";

import { useState } from "react";
import Question from "@/components/Question";
import { AnyQuestion, MCQQuestion, MRQQuestion, TextQuestion, NumberQuestion, BooleanQuestion, DropdownQuestion, FileQuestion } from "@/components/Question/types";
import { validateAnswer } from "@/components/Question/validators";

// Dummy quiz questions about chorca.net
const rawQuestions = [
  {
    type: "MCQ",
    question: "<p>What is Chorca.net primarily used for?</p>",
    A: "<p>Video Streaming</p>",
    B: "<p>Online Shopping</p>",
    C: "<p>Educational Content</p>",
    D: "<p>Social Media</p>",
    E: null,
    answer: null,
    solution: "<p>C is correct</p>",
  },
  {
    type: "MCQ",
    question: "<p>Which programming language is primarily used for Chorca.net?</p>",
    A: "<p>JavaScript</p>",
    B: "<p>Python</p>",
    C: "<p>Java</p>",
    D: "<p>Ruby</p>",
    E: null,
    answer: null,
    solution: "<p>A is correct</p>",
  },
  {
    type: "MCQ",
    question: "<p>Chorca.net supports which of the following content types?</p>",
    A: "<p>Articles</p>",
    B: "<p>Videos</p>",
    C: "<p>Podcasts</p>",
    D: "<p>All of the above</p>",
    E: null,
    answer: null,
    solution: "<p>D is correct</p>",
  },
  {
    type: "MCQ",
    question: "<p>What is Chorca.net primarily used for?</p>",
    A: "<p>Video Streaming</p>",
    B: "<p>Online Shopping</p>",
    C: "<p>Educational Content</p>",
    D: "<p>Social Media</p>",
    E: null,
    answer: null,
    solution: "<p>C is correct</p>",
  },
  {
    type: "text",
    question: "<p>Who founded Chorca.net?</p>",
    answer: null,
    solution: "<p>John Doe</p>",
  },
  {
    type: "boolean",
    question: "<p>Chorca.net is free to use?</p>",
    answer: null,
    solution: "<p>True</p>",
  },
  {
    type: "dropdown",
    question: "<p>Choose the primary programming language used for Chorca.net:</p>",
    A: "<p>JavaScript</p>",
    B: "<p>Python</p>",
    C: "<p>Java</p>",
    D: "<p>Ruby</p>",
    answer: null,
    solution: "<p>JavaScript</p>",
  },
];

// Convert raw questions to AnyQuestion type
const formattedQuestions: AnyQuestion[] = rawQuestions.map((q, index) => {
  const id = `q${index + 1}`;
  switch (q.type.toLowerCase()) {
    case "mcq":
      return {
        id,
        type: "mcq",
        question: q.question,
        options: [
          { label: q.A!, value: "A" },
          { label: q.B!, value: "B" },
          { label: q.C!, value: "C" },
          { label: q.D!, value: "D" },
        ].filter(Boolean),
        required: true,
        answer: null,
      } as MCQQuestion;

    case "text":
      return { id, type: "text", question: q.question, required: true, answer: "" } as TextQuestion;

    case "boolean":
      return { id, type: "boolean", question: q.question, required: true, answer: null } as BooleanQuestion;

    case "dropdown":
      return {
        id,
        type: "dropdown",
        question: q.question,
        options: [
          { label: q.A!, value: "A" },
          { label: q.B!, value: "B" },
          { label: q.C!, value: "C" },
          { label: q.D!, value: "D" },
        ].filter(Boolean),
        required: true,
        answer: null,
      } as DropdownQuestion;

    default:
      throw new Error(`Unsupported question type: ${q.type}`);
  }
});

// Type helper for answer values
type AnswerValue<T extends AnyQuestion> =
  T extends MCQQuestion | DropdownQuestion ? string | null :
  T extends MRQQuestion ? string[] :
  T extends TextQuestion ? string :
  T extends NumberQuestion ? number | null :
  T extends BooleanQuestion ? boolean | null :
  T extends FileQuestion ? File | null :
  never;

export default function Home() {
  const [answers, setAnswers] = useState<Record<string, string | number | boolean | string[] | File | null>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleChange = <T extends AnyQuestion>(id: string, value: AnswerValue<T>) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));

    const question = formattedQuestions.find((q) => q.id === id)!;
    const err = validateAnswer(question, value);
    setErrors((prev) => ({ ...prev, [id]: err }));
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-center text-gray-100">Chorca.net Quiz</h1>

      {formattedQuestions.map((q) => (
        <div key={q.id}>
          <Question
            question={q}
            answer={answers[q.id] as string} // TS will infer correctly via discriminated union
            onChange={(val) => handleChange(q.id, val)}
            onValidate={(err) => setErrors((prev) => ({ ...prev, [q.id]: err }))}
          />
          {errors[q.id] && <p className="text-red-500 mt-1">{errors[q.id]}</p>}
        </div>
      ))}

      <div className="bg-gray-900 text-gray-300 p-4 rounded">
        <h2 className="font-semibold mb-2">Current Answers:</h2>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    </div>
  );
}
