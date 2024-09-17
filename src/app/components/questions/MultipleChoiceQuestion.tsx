import React from "react";
import { type Props } from "./AttachmentQuestion";

const MultipleChoiceQuestion = ({ question, onValueChange }: Props) => {
  if (question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOXES") {
    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange([e.target.value]);
    };
    return (
      <div className="mb-4">
        <label className="mb-2 block font-bold">{question.title}</label>
        <p>{question.description}</p>
        {question.choices?.map((option, index) => (
          <div key={index}>
            <input
              title="multiple choice"
              type="radio"
              name="multiple-choice"
              value={option.choice}
              onChange={handleCheckChange}
            />
            <label className="ml-2">{option.choice}</label>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default MultipleChoiceQuestion;
