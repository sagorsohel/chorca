import { AnyQuestion } from "./types";

export const validateAnswer = (question: AnyQuestion, answer: unknown) => {
  if (question.required && !answer) return "This question is required.";

  switch (question.type) {
    case "mcq":
      return typeof answer === "string" ? null : "Select an option.";

    case "mrq":
      return Array.isArray(answer) && answer.length > 0
        ? null
        : "Select at least one option.";

    case "text":
      return typeof answer === "string" && answer.trim().length > 0
        ? null
        : "Enter text.";

    case "number":
      return !isNaN(Number(answer)) ? null : "Enter a valid number.";

    case "boolean":
      return typeof answer === "boolean" ? null : "Select Yes or No.";

    case "dropdown":
      return typeof answer === "string" ? null : "Select one.";

    case "file":
      if (!answer) return "Upload a file.";
      if (question.maxSizeMB && (answer as File).size / 1024 / 1024 > question.maxSizeMB)
        return `File must be under ${question.maxSizeMB}MB`;
      return null;

    default:
      return null;
  }
};
