"use client";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createTask, gradePathTask } from "../../utils/fetchTask";
import { useState } from "react";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import TextQuestion from "./questions/TextQuestion";
import ParagraphQuestion from "./questions/ParagraphQuestion";
import CheckboxesQuestion from "./questions/CheckboxesQuestion";
import MultipleChoiceQuestion from "./questions/MultipleChoiceQuestion";
import DateQuestion from "./questions/DateQuestion";
import AttachmentQuestion from "./questions/AttachmentQuestion";
import UrlQuestion from "./questions/UrlQuestion";
import CodeQuestion from "./questions/CodeQuestion";
import LinearScaleQuestion from "./questions/LinearScaleQuestion";
import RangeQuestion from "./questions/RangeQuestion";
import DropDownQuestion from "./questions/DropDownQuestion";
import { type z } from "zod";

const QUESTION_TYPES = [
  { id: "TEXT", label: "Text", icon: "📝" },
  { id: "PARAGRAPH", label: "Paragraph", icon: "📄" },
  { id: "CHECKBOXES", label: "Checkboxes", icon: "☑️" },
  { id: "MULTIPLE_CHOICE", label: "Multiple Choice", icon: "🔘" },
  { id: "DATE", label: "Date", icon: "📅" },
  { id: "ATTACHMENT", label: "Attachment", icon: "📎" },
  { id: "URL", label: "URL", icon: "🔗" },
  { id: "CODE", label: "Code", icon: "💻" },
  { id: "LINEAR_SCALE", label: "Linear Scale", icon: "📏" },
  { id: "RANGE", label: "Range", icon: "↔️" },
  { id: "DROP_DOWN", label: "Drop Down", icon: "⬇️" },
];

export type QuestionType = z.infer<typeof QuestionSchema>;
export type AnswerValue = string | number | string[] | number[] | boolean;

type Inputs = {
  topic: string;
  questionType: string | null;
};

const QuestionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [selectedType, setSelectedType] = useState<string[] | null>([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [grades, setGrades] = useState<number[]>([]);

  const handleValueChange = (
    questionId: string,
    answer: string | string[] | number[] | number | boolean,
  ) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const generateQuestion = (question: QuestionType) => {
    switch (question.type) {
      case "MULTIPLE_CHOICE":
        return (
          <MultipleChoiceQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "TEXT":
        return (
          <TextQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "PARAGRAPH":
        return (
          <ParagraphQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "CHECKBOXES":
        return (
          <CheckboxesQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "DATE":
        return (
          <DateQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "ATTACHMENT":
        return (
          <AttachmentQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "URL":
        return (
          <UrlQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "CODE":
        return (
          <CodeQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "LINEAR_SCALE":
        return (
          <LinearScaleQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "RANGE":
        return (
          <RangeQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      case "DROP_DOWN":
        return (
          <DropDownQuestion
            question={question}
            onValueChange={(answer) => handleValueChange(question.id, answer)}
          />
        );
      default:
        return <div>No question available yet.</div>;
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);
      const response = await createTask(data.topic, selectedType ?? []);
      if (response.data) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };
  const onGrading = async () => {
    try {
      const response = await gradePathTask(questions, answer);

      if (response.data) {
        const newGrades = response.data.map((resp) => resp.grading);

        setGrades((prev) => [...prev, ...newGrades]);

        console.log(grades, "Grades collected from response");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(
    grades.reduce((acc, cur) => (acc + cur) / grades.length, 0).toFixed(2),
    "Grades collected from response",
  );

  const handleTypeSelection = (typeId: string) => {
    setSelectedType((prev) => {
      const updatedTypes = prev?.includes(typeId)
        ? prev.filter((id) => id !== typeId)
        : [...(prev ?? []), typeId];

      setValue("questionType", `${JSON.stringify(updatedTypes)}`);

      return updatedTypes;
    });
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

        <div className="mt-6">
          <h3 className="mb-2 text-lg font-bold">Question Types</h3>
          <div className="grid grid-cols-5 gap-3">
            {QUESTION_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => handleTypeSelection(type.id)}
                className={`flex items-center justify-center rounded-lg border p-2 ${
                  selectedType?.includes(type.id)
                    ? "border-blue-500 bg-blue-100"
                    : "border-gray-300 bg-white"
                } transition-colors hover:border-blue-500`}
              >
                <span className="mr-1 text-lg">{type.icon}</span>
                <span className="text-sm font-medium">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="focus:shadow-outline mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Generate Questions
          </button>
          <div className="flex items-center justify-center rounded px-3 text-red-500">
            scored{" "}
            {grades.length > 1
              ? `${grades.reduce((acc, cur) => (acc + cur) / grades.length, 0).toFixed(2)}${" "}outof 5`
              : "no grades yet"}
          </div>
        </div>
      </form>

      {loading ? (
        <div>generating task...</div>
      ) : (
        questions.map((question) => (
          <div key={question.id} className="questions-wrapper mt-6">
            <div>{generateQuestion(question)}</div>
          </div>
        ))
      )}
      {questions && (
        <button
          type="button"
          onClick={onGrading}
          className="focus:shadow-outline mt-4 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
        >
          Grade Questions
        </button>
      )}
    </div>
  );
};

export default QuestionForm;
