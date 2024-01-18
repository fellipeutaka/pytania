"use server";

import { randomUUID } from "node:crypto";

import { db } from "~/lib/db";
import {
  answers,
  questions as questionsSchema,
  quizzes,
} from "~/lib/db/schema/quiz";

import type { CreateQuizSchema } from "./schema";

export async function createQuiz({
  name,
  description,
  creatorId,
  questions,
}: CreateQuizSchema) {
  const [quiz] = await db
    .insert(quizzes)
    .values({
      name,
      description,
      creatorId,
    })
    .returning();

  const data = questions.map((question) => ({
    ...question,
    id: randomUUID(),
  }));

  for (const question of data) {
    await db.insert(questionsSchema).values({
      id: question.id,
      quizId: quiz.id,
      text: question.text,
    });

    await db.insert(answers).values(
      question.answers.map((answer) => ({
        ...answer,
        questionId: question.id,
      })),
    );
  }
}
