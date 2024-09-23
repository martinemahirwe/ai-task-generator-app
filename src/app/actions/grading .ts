"use server";
import { generateObject } from "ai";
import { anthropic } from '@ai-sdk/anthropic';
import { config } from "dotenv";
import { AnswerSchema } from "~/utils/validation/answersSchema.validation";
import { AnswerValue, QuestionType } from "~/hooks/useCreateTask";

config({ path: ".env.local" });

export const gradeChoiceQuestions = async ( 
  questions: QuestionType[],
  userAnswers: Record<string, AnswerValue>
) => {
  const results = questions.map((question: QuestionType) => {

    if (question.type === 'MULTIPLE_CHOICE' || 
        question.type === 'DROP_DOWN' || 
        question.type === 'CHECKBOXES') {
      
      const userAnswer = userAnswers[question.id] ?? [];
      
      const userAnswerArray = Array.isArray(userAnswer) ? userAnswer : [userAnswer];

      const correctChoices = question.choices?.filter(choice => choice.isCorrect).map(choice => choice.choice) || [];
      const totalCorrect = correctChoices.length;

      let grading = 0;

      if (totalCorrect > 0) {
        const userCorrectCount = userAnswerArray.filter(answer =>
          correctChoices.includes(answer as string)
        ).length;

        grading = Math.round((userCorrectCount / totalCorrect) * 5);
      }

      return {
        questionId: question.id,
        userAnswers: userAnswerArray,
        expectedAnswers: correctChoices,
        grading,
      };
    }
  });

  return results;
};


export async function gradeTask(
  questions: QuestionType[],
  userAnswers: Record<string, AnswerValue>,
) {
  const expectedAnswers = (question: QuestionType) => {
    switch (question.type) {
      case 'TEXT':
      case 'PARAGRAPH':
      case 'CODE':
      case 'LINEAR_SCALE':
      case 'RANGE':
      case 'DATE':
      case 'ATTACHMENT':
      case 'URL':
        return {
          [question.id]: question.expectedAnswer,
        };

      default:
        throw new Error(`Unknown question type`);
    }
  };

  try {
    const expectedAnswersList = questions.map(expectedAnswers);

    const { object: task } = await generateObject({
      model: anthropic("claude-3-5-sonnet-20240620"),
      prompt: `

      You are an AI evaluator tasked with grading user answers based on expected answers. Your grading should follow these criteria:
  
      - **5 points**: The answer is complete, articulate, and covers all aspects of the expected answer effectively.
      - **4 points**: The answer is mostly correct but may miss a minor detail or aspect of the expected answer.
      - **3 points**: The answer is partially correct but misses some key elements of the expected answer.
      - **2 points**: The answer is minimally correct, providing some relevant information but failing to meet most of the expected criteria.
      - **1 point**:  The answer is incorrect but reflects a limited understanding of the question or topic
      - **0 points**: The answer is completely wrong or irrelevant to the question.
      
      Evaluate the following text answers for the given questions:
      
      Expected answers: ${JSON.stringify(expectedAnswersList)}
      User Answers: ${JSON.stringify(userAnswers)}
      
      Carefully compare each user answer against the corresponding expected answer. Assign a score between 0 and 5 based on the criteria outlined above. If possible, provide specific reasoning for each score assigned to help clarify your evaluation process.

      Be mindful that a score of 0 should be assigned when the user’s response does not address the question at all or is completely off-topic. Aim for clarity and accuracy in your grading.
      
      questionId in answerSchema is the id of the question that is common in userAnswers and Expected answers;
      `,
      system: "You are an AI grader. Evaluate the user answer based on the expected answer. Provide a score out of 5 and indicate if the answer is correct. Include an explanation in the automated response.",
      schema: AnswerSchema,
      output: "array",
    });

    console.log(task,"here is answer from AI");

    return task;
  } catch (error: unknown) {
    console.error("Error:", error);
  }
}