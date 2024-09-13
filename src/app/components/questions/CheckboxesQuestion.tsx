import { useState } from "react";
import React from "react";
import { type z } from "zod";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { Props } from "./AttachmentQuestion";

const CheckboxesQuestion = ({ question, onValueChange }: Props) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  if (question.type === "CHECKBOXES" && question.choices) {
    const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      const selectedChoices = checked
        ? [...selectedAnswers, value]
        : selectedAnswers.filter((choice) => choice !== value);
      onValueChange(selectedChoices);
      setSelectedAnswers(selectedChoices);
    };

    return (
      <div className="mb-4">
        <label className="mb-2 block font-bold">{question.title}</label>
        <p>{question.description}</p>
        {question.choices.map((option, index) => (
          <div key={index}>
            <input
              title="check box"
              type="checkbox"
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

export default CheckboxesQuestion;
