"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createTask } from "../utils/fetchTask";
import { createPathTask } from "./actions";
import { QuestionDisplay } from "./QuestionDisplay";
import { useState } from "react";
import { type QuestionProps } from "./QuestionCard";

type Inputs = {
  topic: string;
};

const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [questions, setQuestions] = useState<QuestionProps[]>([]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await createTask(data.topic);
      console.log("Here is the created task:", response.data);
      if (response?.data) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className="quiz-form-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg bg-gray-100 p-6 shadow-md"
      >
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="topic"
          >
            Topic
          </label>
          <input
            type="text"
            id="topic"
            className="focus:shadow-outline w-full appearance-none rounded-lg border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            required
            {...register("topic")}
          />
          {errors && <span>{errors.root?.message}</span>}
        </div>
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          Generate Questions
        </button>
      </form>

      {questions.length > 0 && (
        <div className="questions-wrapper mt-6">
          <QuestionDisplay questions={questions} />
        </div>
      )}
    </div>
  );
};

export default QuestionForm;
