"use server";
import { generateObject } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { config } from "dotenv";
import { AnswerSchema } from "~/utils/validation/answersSchema.validation";
import {
  type AnswerValue,
  type QuestionType,
} from "../components/QuestionForm";

config({ path: ".env.local" });

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
        return question.expectedAnswer;
  
      case 'CHECKBOXES':
      case 'MULTIPLE_CHOICE':
      case 'DROP_DOWN':
        return question.choices.filter(choice => choice.isCorrect).map(choice => choice.choice);
  
      default:
        throw new Error(`Unknown question type`);
    }
  };

  try {
    const expectedAnswersList = questions.map(expectedAnswers);

    console.log(expectedAnswersList,"expected answerlist");
    
    const { object: task } = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      prompt: `
      You are an AI evaluator tasked with grading user answers based on expected answers. Your grading should follow these criteria:
      
      - **5 points**: The answer is complete, articulate, and covers all aspects of the expected answer effectively.
      - **4 points**: The answer is mostly correct but may miss a minor detail or aspect of the expected answer.
      - **3 points**: The answer is partially correct but misses some key elements of the expected answer.
      - **2 points**: The answer is minimally correct, providing some relevant information but failing to meet most of the expected criteria.
      - **1 point**: The answer is incorrect, demonstrating a misunderstanding of the question or topic.
      - **0 points**: The answer is completely wrong or irrelevant to the question.
      
      Evaluate the following text answers for the given questions:
      
      Expected answers: ${JSON.stringify(expectedAnswersList)}
      User Answers: ${JSON.stringify(userAnswers)}
      
      Carefully compare each user answer against the corresponding expected answer. Assign a score between 0 and 5 based on the criteria outlined above. If possible, provide specific reasoning for each score assigned to help clarify your evaluation process.
      
      Be mindful that a score of 0 should be assigned when the user’s response does not address the question at all or is completely off-topic. Aim for clarity and accuracy in your grading.
      `,
      system: "You are an AI grader Evaluate the user answer based on the expected answer.Provide a score out of 5 and indicate if the answer is correct.Include an explanation in the automated response.",
      schema: AnswerSchema,
      output: "array",
    });
    
    console.log("Response from AI here:", task);
    return task;
  } catch (error: unknown) {
    console.error("Error:", error);
  }
}