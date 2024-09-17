import React from "react";
import { type Props } from "./AttachmentQuestion";

const RangeQuestion = ({ question, onValueChange }: Props) => {
  if (question.type == "RANGE") {
    return (
      <div className="mb-4">
        <label className="mb-2 block font-bold">{question.title}</label>
        <p>{question.description}</p>
        <input
          type="range"
          title="input range"
          min={question.min}
          max={question.max}
          step={1}
          className="w-full"
          onChange={(e) => onValueChange(e.target.value)}
        />
        <p>
          Value: {question.min} (Min:{" "}
          {question.min}, Max: {question.max})
        </p>
      </div>
    );
  }
  return <div>unknown question type</div>;
};

export default RangeQuestion;
