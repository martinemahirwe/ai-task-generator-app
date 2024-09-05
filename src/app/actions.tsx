"use server";
import { generateObject } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { config } from "dotenv";
import { QuestionSchema } from "~/utils/validation/schema.validation";

config({ path: ".env.local" });

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://api.anthropic.com/v1",
});

export async function createPathTask(topic: string) {
  try {
    const { object: task } = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      prompt: `Generate 10 questions for the topic: ${topic}
            Format the response as JSON in the shape of: ${JSON.stringify(QuestionSchema)}
            Include the following types of questions: multiple questions and text`,

      system: "You are a trivia question generator!",
      schema: QuestionSchema,
      output: "array",
    });

    return task;
  } catch (error: unknown) {
    console.error("Error:", error);
  }
}
