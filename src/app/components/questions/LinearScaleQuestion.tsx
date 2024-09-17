import React from "react";
import { type Props } from "./AttachmentQuestion";

const LinearScaleQuestion = ({ question, onValueChange }: Props) => {
  if (question.type == "LINEAR_SCALE") {
    return (
      <div className="mb-4">
        <label className="mb-2 block font-bold">{question.title}</label>
        <p>{question.description}</p>
        <input
          title="input range"
          type="range"
          min={question.fromRangeLabel}
          max={question.toRangeValue}
          className="w-full"
          onChange={(e) => onValueChange(e.target.value)}
        />
        <p>
          Value: {question.toRangeValue} (Min:{" "}
          {question.fromRangeLabel}, Max:{" "}
          {question.toRangeValue})
        </p>
      </div>
    );
  }
  return <div>error while generating</div>;
};

export default LinearScaleQuestion;
