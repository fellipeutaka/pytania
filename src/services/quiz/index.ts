"use server";

import { randomUUID } from "node:crypto";

import { db } from "~/lib/db";
import { answers, questions, quizzes } from "~/lib/db/schema/quiz";

type CreateQuizProps = typeof quizzes.$inferInsert;

export async function createQuiz({
  name,
  description,
  creatorId,
}: CreateQuizProps) {
  const [quiz] = await db
    .insert(quizzes)
    .values({
      name,
      description,
      creatorId,
    })
    .returning();

  const questionId = randomUUID();
  const correctAnswerId = randomUUID();

  await db.insert(questions).values({
    id: questionId,
    quizId: quiz.id,
    text: "What is the capital of France?",
    correctAnswerId: correctAnswerId,
  });

  await db.insert(answers).values([
    {
      id: correctAnswerId,
      questionId,
      text: "Paris",
    },
    {
      questionId,
      text: "London",
    },
    {
      questionId,
      text: "Berlin",
    },
    {
      questionId,
      text: "Rome",
    },
  ]);
}
