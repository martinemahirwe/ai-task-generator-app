import React from "react";
import { type z } from "zod";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { Props } from "./AttachmentQuestion";

const CodeQuestion = ({ question, onValueChange }: Props) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-bold">{question.title}</label>
      <p>{question.description}</p>
      <textarea
        className="w-full rounded-lg border p-2"
        rows={4}
        placeholder="Write your code here..."
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
};

export default CodeQuestion;
