
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

export const QuestionChoiceSchema = z.object({
  id: z.string(),
  choice: z.string(),
  isCorrect: z.boolean(),
});

const BaseQuestionSchema = z.object({
  id: z.string(),
  title: z.string(),
  label: z.string(),
  description: z.string().optional(),
  required: z.boolean().optional(),
  version: z.number(),
  orderIndex: z.number(),
});

const TextQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('TEXT'),
  minWords: z.number().optional(),
  maxWords: z.number().optional(),
  expectedAnswer: z.string(),
});

const ParagraphQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('PARAGRAPH'),
  minWords: z.number().optional(),
  maxWords: z.number().optional(),
  expectedAnswer: z.string(),
});

const ChoicesQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('CHECKBOXES').or(z.literal('MULTIPLE_CHOICE')).or(z.literal('DROP_DOWN')),
  choices: z.array(QuestionChoiceSchema).min(2, 'Choices are required'),
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
  min: z.number(),
  max: z.number(),
  expectedAnswer: z.string(),
});

const DateQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('DATE'),
  expectedAnswer: z.string(),
});

const AttachmentQuestionSchema = BaseQuestionSchema.extend({
  type: z.literal('ATTACHMENT'),
  fileType: z.enum(['image', 'video', 'document']),
  maxFileSize: z.number().optional(),
  expectedAnswer:  z.string(),
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
  RangeQuestionSchema,
  LinearScaleQuestionSchema,
  DateQuestionSchema,
  AttachmentQuestionSchema,
  UrlQuestionSchema,
]);