import { z } from 'zod';

export const AnswerSchema = z.object({
  questionId:z.string(),
  userAnswers: z.array(z.string()),
  expectedAnswers: z.array(z.string()),
  grading: z.number().min(0).max(5),
});

export type GradesType = z.infer<typeof AnswerSchema>;
