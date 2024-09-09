import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const QuestionChoiceSchema = z.object({
  id: z.string(),
  choice: z.string(),
  isCorrect: z.boolean(),
});

const BaseQuestionSchema = z.object({
  id: z.string().uuid().default(() => uuidv4()),
  title: z.string(),
  description: z.string(),
  version: z.number(),
  orderIndex: z.number(),
});

const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('TEXT').or(z.literal('PARAGRAPH')),
  expectedAnswer: z.string(),
});

const ChoicesQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('CHECKBOXES').or(z.literal('MULTIPLE_CHOICE')),
  choices: z.array(QuestionChoiceSchema).min(1, 'Choices are required'),
});

const CodeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('CODE'),
  metadata: z.object({
    codesInfo: z.object({
      codeQuestion: z.string(),
      language: z.string(),
    }),
    expectedAnswer: z.string(),
  }),
});

const LinearScaleQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('LINEAR_SCALE'),
  metadata: z.object({
    linearScale: z.object({
      toRangeValue: z.number(),
      fromRangeLabel: z.string(),
      toRangeLabel: z.string(),
    }),
    expectedAnswer: z.number(),
  }),
});

const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('RANGE'),
  metadata: z.object({
    range: z.object({
      min: z.string(),
      max: z.string(),
    }),
    expectedAnswer: z.number(),
  }),
});

const DropDownQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('DROP_DOWN'),
  metadata: z.object({
    dropDown: z.object({
      dataset: z.string(),
      datasetData: z.array(z.string()),
    }),
  }),
});

const DateQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('DATE'),
  metadata: z.object({
    expectedAnswer: z.string()
    // date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    //   message: 'Invalid date format',
    // }),
  }),
});

const AttachmentQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('ATTACHMENT'),
  metadata: z.object({
    attachment: z.object({
      fileType: z.enum(['image', 'video', 'document']),
      fileUrl: z.string().url(),
    }),
    expectedAnswer: z.string()
  }),
});

const UrlQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('URL'),
  metadata: z.object({
    url: z.string().url(),
    expectedAnswer: z.string(),
  }),
});

export const QuestionSchema = z.union([
  TextQuestionSchema,
  ChoicesQuestionSchema,
  CodeQuestionSchema,
  LinearScaleQuestionSchema,
  RangeQuestionSchema,
  DropDownQuestionSchema,
  DateQuestionSchema,
  AttachmentQuestionSchema,
  UrlQuestionSchema,
]);
