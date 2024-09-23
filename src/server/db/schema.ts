// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
import { pgTable, uuid, text, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from 'uuid';

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
  type: text("type").notNull(),
  metadata: json('metadata').$type<{
    choices?: Array<{
      id: string,
      choice: string,
      isCorrect?: boolean
    }>,
    expectedAnswer?: string,
    language?: string,
    toRangeValue?: number,
    fromRangeLabel?: string,
    toRangeLabel?: string,
    min?: number,
    max?: number,
    fileType?: string,
    maxFileSize?: number,
    url?: string
  }>().notNull()
});


export const answers = pgTable("answers", {
  id: uuid('id').primaryKey().defaultRandom(),
  questionId: uuid("question_id").references(() => questions.id).notNull(),
  userAnswers: json('user_answers').$type<string[]>().notNull(),
  expectedAnswers: json('expected_answers').$type<string[]>().notNull(),
  grading: integer("grading").notNull(),
});