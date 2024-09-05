import { QuestionCard, type QuestionProps } from "./QuestionCard";

export const QuestionDisplay = ({
  questions,
}: {
  questions: QuestionProps[];
}) => {
  return (
    <div className="questions-container">
      {questions.map((question) => (
        <QuestionCard key={question.id} {...question} />
      ))}
    </div>
  );
};
