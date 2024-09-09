import React from "react";
import { type z } from "zod";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { Props } from "./AttachmentQuestion";

const LinearScaleQuestion = ({ question, onValueChange }: Props) => {
  if (question.type == "LINEAR_SCALE") {
    return (
      <div className="mb-4">
        <label className="mb-2 block font-bold">{question.title}</label>
        <p>{question.description}</p>
        <input
          title="input range"
          type="range"
          min={question.metadata.linearScale.fromRangeLabel}
          max={question.metadata.linearScale.toRangeValue}
          className="w-full"
          onChange={(e) => onValueChange(e.target.value)}
        />
        <p>
          Value: {question.metadata.linearScale.toRangeValue} (Min:{" "}
          {question.metadata.linearScale.fromRangeLabel}, Max:{" "}
          {question.metadata.linearScale.toRangeValue})
        </p>
      </div>
    );
  }
  return <div>error while generating</div>;
};

export default LinearScaleQuestion;
