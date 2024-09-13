import React from "react";
import { type z } from "zod";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { Props } from "./AttachmentQuestion";

const RangeQuestion = ({ question, onValueChange }: Props) => {
  if (question.type == "RANGE") {
    return (
      <div className="mb-4">
        <label className="mb-2 block font-bold">{question.title}</label>
        <p>{question.description}</p>
        <input
          type="range"
          title="input range"
          min={question.metadata.range.min}
          max={question.metadata.range.max}
          step={1}
          className="w-full"
          onChange={(e) => onValueChange(e.target.value)}
        />
        <p>
          Value: {question.metadata.range.min} (Min:{" "}
          {question.metadata.range.min}, Max: {question.metadata.range.max})
        </p>
      </div>
    );
  }
  return <div>unknown question type</div>;
};

export default RangeQuestion;
