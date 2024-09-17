import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const QuestionChoiceSchema = z.object({
  id: z.string(),
  choice: z.string(),
  isCorrect: z.boolean(),
});

export const expectedAnswerSchema = z.object({
expectedAnswer: z.string(),
});

const BaseQuestionSchema = z.object({
  id: z.string().uuid().default(() => uuidv4()),
  title: z.string(),
  label: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  version: z.number(),
  orderIndex: z.number(),
});

const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('TEXT'),
  expectedAnswer: z.string(),
});

const ParagraphQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('PARAGRAPH'),
  expectedAnswer: z.string(),
  wordLimit: z.number().optional(),
});

const ChoicesQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('CHECKBOXES').or(z.literal('MULTIPLE_CHOICE')).or(z.literal('DROP_DOWN')),
  choices: z.array(QuestionChoiceSchema).min(1, 'Choices are required'),
});

const CodeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('CODE'),
  language: z.string(),
  expectedAnswer:z.string(),
});

const LinearScaleQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('LINEAR_SCALE'),
  toRangeValue: z.number(),
  fromRangeLabel: z.string(),
  toRangeLabel: z.string(),
  expectedAnswer: z.string(),
});

const RangeQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('RANGE'),
  min: z.string(),
  max: z.string(),
  expectedAnswer: z.string(),
});

const DateQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('DATE'),
  expectedAnswer: expectedAnswerSchema
});

const AttachmentQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('ATTACHMENT'),
  fileType: z.enum(['image', 'video', 'document']),
  maxFileSize: z.number().optional(),
  expectedAnswer:  z.string().url(),
});

const UrlQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('URL'),
  expectedAnswer: z.string().url(),
});

export const QuestionSchema = z.union([
  TextQuestionSchema,
  ParagraphQuestionSchema,
  ChoicesQuestionSchema,
  CodeQuestionSchema,
  LinearScaleQuestionSchema,
  RangeQuestionSchema,
  DateQuestionSchema,
  AttachmentQuestionSchema,
  UrlQuestionSchema,
]);
