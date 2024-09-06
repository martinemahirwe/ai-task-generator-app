import { z } from "zod";
import { v4 as uuidv4} from 'uuid';

export const QuestionChoiceSchema = z.object({
    id: z.string(),
    choice: z.string(),
    isCorrect: z.boolean(),
  });
  
  export const QuestionSchema = z.object({
      id: z.string().uuid().default(()=>uuidv4()),
      type: z.number(),
      title: z.string(),
      description: z.string().optional(),
      version: z.number(),
      orderIndex: z.number(),
      choices: z.array(QuestionChoiceSchema).optional(),
      subskillId: z.number().optional(),
      metadata: z.object({
          automatedResponse: z.string().optional(),
          codesInfo: z
              .object({
                  codeQuestion: z.string().optional(),
                  language: z.string().optional(),
              })
              .nullable()
              .optional(),
          validationRules: z.any().optional(),
          linearScale: z
              .object({
                  toRangeValue: z.number().optional(),
                  fromRangeLabel: z.string().optional(),
                  toRangeLabel: z.string().optional(),
              })
              .optional(),
          dropDown: z
              .object({
                  dataset: z.string(),
                  datasetData: z.array(z.string()).optional(),
              })
              .optional(),
          range: z
              .object({
                  min: z.string(),
                  max: z.string(),
              })
              .optional(),
      }),
  });
  