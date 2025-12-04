"use client";

import React from "react";
import { AnyQuestion, MCQQuestion, MRQQuestion, TextQuestion, NumberQuestion, BooleanQuestion, DropdownQuestion, FileQuestion } from "./types";
import { validateAnswer } from "./validators";

import MCQ from "@/components/renderers/MCQ";
import MRQ from "@/components/renderers/MRQ";
import Text from "@/components/renderers/Text";
import NumberField from "@/components/renderers/Number";
import BooleanField from "@/components/renderers/Boolean";
import Dropdown from "@/components/renderers/Dropdown";
import FileUpload from "@/components/renderers/FileUpload";

// Map question types to their renderer props
type RendererPropsMap = {
  mcq: { question: MCQQuestion; answer: string | null; onChange: (value: string) => void };
  mrq: { question: MRQQuestion; answer: string[]; onChange: (value: string[]) => void };
  text: { question: TextQuestion; answer: string; onChange: (value: string) => void };
  number: { question: NumberQuestion; answer: number | null; onChange: (value: number) => void };
  boolean: { question: BooleanQuestion; answer: boolean | null; onChange: (value: boolean) => void };
  dropdown: { question: DropdownQuestion; answer: string | null; onChange: (value: string) => void };
  file: { question: FileQuestion; answer: File | null; onChange: (value: File | null) => void };
};

// Map question types to React components
const componentMap: {
  [K in keyof RendererPropsMap]: React.FC<RendererPropsMap[K]>;
} = {
  mcq: MCQ,
  mrq: MRQ,
  text: Text,
  number: NumberField,
  boolean: BooleanField,
  dropdown: Dropdown,
  file: FileUpload,
};

interface QuestionProps<T extends AnyQuestion = AnyQuestion> {
  question: T;
  answer: T extends MCQQuestion
    ? string | null
    : T extends MRQQuestion
    ? string[]
    : T extends TextQuestion
    ? string
    : T extends NumberQuestion
    ? number | null
    : T extends BooleanQuestion
    ? boolean | null
    : T extends DropdownQuestion
    ? string | null
    : T extends FileQuestion
    ? File | null
    : never;
  onChange: (value: QuestionProps["answer"]) => void;
  onValidate?: (error: string | null) => void;
}

export default function Question<T extends AnyQuestion>({
  question,
  answer,
  onChange,
  onValidate,
}: QuestionProps<T>) {
  const Renderer = componentMap[question.type] as React.FC<any>;

  const handleChange = (value: QuestionProps<T>["answer"]) => {
    onChange(value);
    const error = validateAnswer(question, value);
    onValidate?.(error);
  };

  return <Renderer question={question} answer={answer} onChange={handleChange} />;
}
