import React from "react";
import { type z } from "zod";
import { AnswerValue } from "~/hooks/useCreateTask";
import { type QuestionSchema } from "~/utils/validation/schema.validation";

export interface Props {
  question: z.infer<typeof QuestionSchema>;
  onValueChange: (value: AnswerValue) => void;
}

const AttachmentQuestion = ({ question, onValueChange }: Props) => {
  return (
    <div className="mb-4">
      <label className="mb-2 block font-bold">{question.title}</label>
      <div>{question.description}</div>
      <input
        title="upload file"
        type="file"
        className="w-full"
        onChange={(e) => onValueChange(e.target.value)}
      />
    </div>
  );
};

export default AttachmentQuestion;
