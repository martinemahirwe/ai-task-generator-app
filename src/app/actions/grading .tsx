"use server";
import { generateObject } from "ai";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
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
  try {
    const { object: task } = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      prompt: `
      Evaluate the following text answer for the given question:
      Question: ${JSON.stringify(questions)}
      Answer: ${JSON.stringify(userAnswers)}
      compare the answers given by user with expectedAnswers and
      grade the user answers on a scale of 0 to 5, where 5 is a perfect answer and 0 is a totally wrong answer.
    `,
      system: "You are a task generator!",
      schema: AnswerSchema,
      output: "array",
    });
    return task;
  } catch (error: unknown) {
    console.error("Error:", error);
  }
}
