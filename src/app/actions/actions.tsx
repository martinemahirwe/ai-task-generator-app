"use server";
import { generateObject } from "ai";
import { anthropic, createAnthropic } from "@ai-sdk/anthropic";
import { config } from "dotenv";
import { QuestionSchema } from "~/utils/validation/schema.validation";

config({ path: ".env.local" });

export async function createPathTask(topic: string, selectedType: string[]) {
  try {
    const { object: task } = await generateObject({
      model: anthropic("claude-3-haiku-20240307"),
      prompt: `Generate questions that match the number of selected types for the topic: "${topic}". 
            Format the response as JSON according to the following schema: ${JSON.stringify(QuestionSchema)}. 
            Generate questions of the following types: ${JSON.stringify(selectedType)}. 
            Ensure that the questions are relevant to the selected question types and are diverse in nature.`,

      system:
        "You are a task generator! Your role is to create relevant and diverse questions based on the provided topic and types.",
      schema: QuestionSchema,
      output: "array",
    });

    return task;
  } catch (error: unknown) {
    console.error("Error:", error);
  }
}
