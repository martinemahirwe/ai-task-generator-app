import React from "react";
import { type z } from "zod";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { Props } from "./AttachmentQuestion";

const TextQuestion = ({ question, onValueChange }: Props) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-bold">{question.title}</label>
      <div className="mt-2">{question.description}</div>
      <textarea
        className="w-full rounded-lg border p-2 outline-none"
        placeholder="Enter your text here (Markdown supported)"
        onChange={(e) => onValueChange(e.target.value)}
        required
      />
    </div>
  );
};

export default TextQuestion;
