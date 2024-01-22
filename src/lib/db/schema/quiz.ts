import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./auth";

type Question = {
  id: string;
  text: string;
  limitTime?: number;
  answers: Answer[];
};

type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
};

export const quizzes = pgTable("quiz", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  creatorId: text("creator_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  questions: jsonb("questions").notNull().$type<Question[]>().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const submissions = pgTable("submission", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  quizId: uuid("quiz_id")
    .notNull()
    .references(() => quizzes.id, { onDelete: "cascade" }),
  questionId: uuid("question_id").notNull(),
  answerId: uuid("answer_id"), // May be null if the user did not answer the question within the time limit
  startedAt: timestamp("started_at").notNull().defaultNow(), // Time at which the question was presented to the user
  submittedAt: timestamp("submitted_at"), // Time the response was submitted
});
