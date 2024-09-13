import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const AnswerSchema = z.object({
  id: z.string().uuid().default(() => uuidv4()),
  questionId: z.string(),
  questionType: z.string(),
  userAnswers: z.array(z.string()),
  expectedAnswers: z.array(z.string()),
  grading: z.number().min(0).max(5),
});

export type GradesType = z.infer<typeof AnswerSchema>;
