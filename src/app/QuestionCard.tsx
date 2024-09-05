import React, { useState, useEffect } from "react";

export interface QuestionProps {
  id: string;
  type: number;
  title: string;
  description?: string;
  choices?: Array<{ id: string; choice: string; isCorrect: boolean }>;
}

export const QuestionCard: React.FC<QuestionProps> = ({
  id,
  type,
  title,
  description,
  choices,
}) => {
  return (
    <div className="question-card my-4 rounded-lg border p-4 shadow-md">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      {type === 1 && choices ? (
        <ul className="choices-list mt-2">
          {choices.map((choice) => (
            <li key={choice.id} className="choice-item">
              <label>
                <input type="radio" name={`question-${id}`} />
                <span className="ml-2">{choice.choice}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : type === 2 && description ? (
        <textarea
          name=""
          id=""
          placeholder="type your answer here"
          className="rounded border-gray-100 pr-[150px] outline-none"
        ></textarea>
      ) : null}
    </div>
  );
};
