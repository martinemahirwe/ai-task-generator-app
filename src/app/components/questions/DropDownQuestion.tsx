import React, { useState } from "react";
import { type z } from "zod";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { type Props } from "./AttachmentQuestion";

const DropDownQuestion = ({ question, onValueChange }: Props) => {
  if (question.type == "DROP_DOWN")
    return (
      <div className="mb-4">
        <label className="mb-2 block font-bold">{question.title}</label>
        <p>{question.description}</p>
        <select
          title="select"
          className="w-full rounded-lg border p-2 outline-none"
        >
          <option value="">Select an option</option>
          {question.metadata.dropDown.datasetData.map((option, index) => (
            <option
              key={index}
              value={option}
              onChange={() => onValueChange(option)}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
    );
};

export default DropDownQuestion;
