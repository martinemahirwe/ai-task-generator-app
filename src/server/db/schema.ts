// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  index,
  json,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `openai-quiz-app_${name}`);

import { pgTable, uuid, text, integer, boolean, PgArray } from "drizzle-orm/pg-core";

export const questions = pgTable("questions", {
  id: uuid("id").primaryKey(),
  title: text("title").notNull(),
  label: text("label").notNull(),
  description: text("description").notNull(),
  version: integer("version").notNull(),
  required: boolean('required').default(true),
  orderIndex: integer("order_index").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const choicesQuestion = pgTable("choicesQuestion", {
  questionId: uuid("question_id").references(() => questions.id).notNull(),
  choices: json('choices').$type<Array<{
    id: string,
    choice: string,
    isCorrect?: boolean
}>>().notNull(),
});

export const codeQuestionMetadata = pgTable("code_question_metadata", {
  questionId: uuid("question_id").references(() => questions.id).primaryKey(),
  language: text("language").notNull(),
  expectedAnswer: text("expected_answer").notNull(),
});

export const linearScaleMetadata = pgTable("linear_scale_metadata", {
  questionId: uuid("question_id").references(() => questions.id).primaryKey(),
  toRangeValue: integer("to_range_value").notNull(),
  fromRangeLabel: text("from_range_label").notNull(),
  toRangeLabel: text("to_range_label").notNull(),
  expectedAnswer: text("expected_answer").notNull(),
});

export const rangeQuestionMetadata = pgTable("range_question_metadata", {
  questionId: uuid("question_id").references(() => questions.id).primaryKey(),
  min: text("min").notNull(),
  max: text("max").notNull(),
  expectedAnswer: integer("expected_answer").notNull(),
});

export const dateQuestionMetadata = pgTable("date_question_metadata", {
  questionId: uuid("question_id").references(() => questions.id).primaryKey(),
  expectedAnswer: text("expected_answer").notNull(),
});

export const attachmentQuestionMetadata = pgTable("attachment_question_metadata", {
  questionId: uuid("question_id").references(() => questions.id).primaryKey(),
  fileType: text("file_type").notNull(),
  maxFileSize: integer("maxFileSize").notNull(),
  expectedAnswer: text("expected_answer").notNull(),
});

export const urlQuestionMetadata = pgTable("url_question_metadata", {
  questionId: uuid("question_id").references(() => questions.id).primaryKey(),
  url: text("url").notNull(),
  expectedAnswer: text("expected_answer").notNull(),
});
