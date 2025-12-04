export type QuestionType =
  | "mcq"
  | "mrq"
  | "text"
  | "number"
  | "boolean"
  | "dropdown"
  | "file";

export type QuestionBase = {
  id: string;
  type: QuestionType;
  question: string;
  required?: boolean;
};

// MCQ/MRQ option
export type MCQOption = {
  label: string;
  value: string;
};

// MCQ Question
export type MCQQuestion = QuestionBase & {
  type: "mcq";
  options: MCQOption[];
  answer?: string | null;
};

// MRQ Question
export type MRQQuestion = QuestionBase & {
  type: "mrq";
  options: MCQOption[];
  answer?: string[] | null;
};

// Text Question
export type TextQuestion = QuestionBase & {
  type: "text";
  answer?: string;
};

// Number Question
export type NumberQuestion = QuestionBase & {
  type: "number";
  min?: number; // optional min value
  max?: number; // optional max value
  answer?: number | null;
};

// Boolean Question
export type BooleanQuestion = QuestionBase & {
  type: "boolean";
  answer?: boolean | null;
};

// Dropdown Question
export type DropdownQuestion = QuestionBase & {
  type: "dropdown";
  options: MCQOption[];
  answer?: string | null;
};

// File Question
export type FileQuestion = QuestionBase & {
  type: "file";
  maxSizeMB?: number; // optional max size in MB
  answer?: File | null;
};

// Any Question
export type AnyQuestion =
  | MCQQuestion
  | MRQQuestion
  | TextQuestion
  | NumberQuestion
  | BooleanQuestion
  | DropdownQuestion
  | FileQuestion;
