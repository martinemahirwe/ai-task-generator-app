import { useForm, type SubmitHandler } from "react-hook-form";
import { createTask, gradePathTask } from "../utils/fetchTask";
import { useState } from "react";
import { type QuestionSchema } from "~/utils/validation/schema.validation";
import { type z } from "zod";
import AttachmentQuestion from "~/app/components/questions/AttachmentQuestion";
import CheckboxesQuestion from "~/app/components/questions/CheckboxesQuestion";
import CodeQuestion from "~/app/components/questions/CodeQuestion";
import DateQuestion from "~/app/components/questions/DateQuestion";
import DropDownQuestion from "~/app/components/questions/DropDownQuestion";
import LinearScaleQuestion from "~/app/components/questions/LinearScaleQuestion";
import MultipleChoiceQuestion from "~/app/components/questions/MultipleChoiceQuestion";
import ParagraphQuestion from "~/app/components/questions/ParagraphQuestion";
import RangeQuestion from "~/app/components/questions/RangeQuestion";
import TextQuestion from "~/app/components/questions/TextQuestion";
import UrlQuestion from "~/app/components/questions/UrlQuestion";
import { toast } from "react-toastify";

const QUESTION_TYPES = [
  { id: "TEXT", label: "text", icon: "📝" },
  { id: "PARAGRAPH", label: "paragraph", icon: "📄" },
  { id: "CHECKBOXES", label: "checkboxes", icon: "☑️" },
  { id: "MULTIPLE_CHOICE", label: "multiple Choice", icon: "🔘" },
  { id: "DATE", label: "date", icon: "📅" },
  { id: "ATTACHMENT", label: "attachment", icon: "📎" },
  { id: "URL", label: "url", icon: "🔗" },
  { id: "CODE", label: "code", icon: "💻" },
  { id: "LINEAR_SCALE", label: "linear scale", icon: "📏" },
  { id: "RANGE", label: "range", icon: "↔️" },
  { id: "DROP_DOWN", label: "drop down", icon: "⬇️" },
];

const Difficulty = [
  { id: 'EASY', label: 'easy', color: 'bg-green-500' },
  { id: 'MEDIUM', label: 'medium', color: 'bg-yellow-500' },
  { id: 'DIFFICULT', label: 'difficult', color: 'bg-red-500' },
];

type GradingRes = {
  questionId: string;
  userAnswers: string[];
  expectedAnswers: string[];
  grading: number;
}[];

export type QuestionType = z.infer<typeof QuestionSchema>;
export type AnswerValue = string | number | string[] | number[] | boolean;

type Inputs = {
  topic: string;
  questionType: string | null;
};

export const useCreateTask = ()=>{
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
      } = useForm<Inputs>();
    
      const [questions, setQuestions] = useState<QuestionType[]>([]);
      const [selectedType, setSelectedType] = useState<string[] | null>([]);
      const [loading, setLoading] = useState(false);
      const [loader,setLoader] = useState(false);
      const [answer, setAnswers] = useState<Record<string, AnswerValue>>({});
      const [grades, setGrades] = useState<number[]>([]);
      const [gradingRes,setGradingRes] = useState<GradingRes>([])
      const [label,setLabel] = useState<string>("easy");
    
      const handleValueChange = (
        questionId: string,
        answer: string | string[] | number[] | number | boolean,
      ) => {
        setAnswers((prevAnswers) => ({
          ...prevAnswers,
          [questionId]: answer,
        }));
      };
      
      const renderQuestions = (question: QuestionType) => {
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
          const response = await createTask(data.topic, selectedType ?? [],label);
          if (response.data) {
            setQuestions(response.data);
            setGrades([]);
            setGradingRes([])
          }
        } catch (error) {
          console.error("Error creating task:", error);
        } finally {
          setLoading(false);
        }
      };
      const onGrading = async () => {
        try {
          const unansweredQuestions = questions.some(
            (question) => !answer[question.id]
          );
      
          if (unansweredQuestions) {
            toast.error("You have to complete all questions before submiting results!");
            return;
          }
      
          setLoader(true);
          const response = await gradePathTask(questions, answer);
          if (response.data) {
            const newGrades = response.data.map((resp) => resp.grading);
            setGrades((prev) => [...prev, ...newGrades]);
            setGradingRes(response.data);
          }
        } catch (error) {
          console.error("Error creating task:", error);
        } finally {
          setLoader(false);
        }
      };

      const setDifficulty = (label: string) => {
        setLabel(label);
      };
      
      const handleTypeSelection = (typeId: string) => {
        setSelectedType((prev) => {
          const updatedTypes = prev?.includes(typeId)
            ? prev.filter((id) => id !== typeId)
            : [...(prev ?? []), typeId];
    
          setValue("questionType", `${JSON.stringify(updatedTypes)}`);
    
          return updatedTypes;
        });
      };

      return {
        answer,
        setGrades,
        setLoader,
        register,
        handleSubmit,
        renderQuestions,
        onSubmit,
        onGrading,
        handleTypeSelection,
        loading,
        loader,
        grades,
        QUESTION_TYPES,
        errors,
        selectedType,
        questions,
        gradingRes,
        Difficulty,
        setDifficulty,
        label
      }
}