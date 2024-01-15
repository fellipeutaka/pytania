import { relations } from "drizzle-orm";
import { uuid, text, timestamp, pgTable } from "drizzle-orm/pg-core";

import { users } from "./auth";

export const quizzes = pgTable("quiz", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  creatorId: text("creator_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const questions = pgTable("question", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  correctAnswerId: uuid("correct_answer_id").notNull(),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => quizzes.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const answers = pgTable("answer", {
  id: uuid("id").primaryKey().defaultRandom(),
  text: text("text").notNull(),
  questionId: uuid("question_id")
    .notNull()
    .references(() => questions.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const quizRelations = relations(quizzes, ({ many }) => ({
  questions: many(questions),
}));

export const questionRelations = relations(questions, ({ one, many }) => ({
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
  answers: many(answers),
}));

export const answerRelations = relations(answers, ({ one }) => ({
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
}));
