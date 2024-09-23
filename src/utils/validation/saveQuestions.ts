import { z } from "zod";

export const GeneratedQuestionsSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  label: z.string(),
  description: z.string(),
  version: z.number(),
  required: z.boolean().default(true),
  orderIndex: z.number(),
  type: z.string(),
  metadata: z.object({
    choices: z.array(z.object({
      id: z.string(),
      choice: z.string(),
      isCorrect: z.boolean().optional()
    })).optional(),
    expectedAnswer: z.string().optional(),
    language: z.string().optional(),
    toRangeValue: z.number().optional(),
    fromRangeLabel: z.string().optional(),
    toRangeLabel: z.string().optional(),
    min: z.number().optional(),
    max: z.number().optional(),
    fileType: z.string().optional(),
    maxFileSize: z.number().optional(),
  })
});

export type GeneratedQuestionType = z.infer<typeof GeneratedQuestionsSchema>;