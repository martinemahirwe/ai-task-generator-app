import React, { useState } from "react";
import { type z } from "zod";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { Props } from "./AttachmentQuestion";

const MultipleChoiceQuestion = ({ question, onValueChange }: Props) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
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
