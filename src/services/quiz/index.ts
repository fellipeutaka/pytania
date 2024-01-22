"use server";

import { randomUUID } from "node:crypto";

import { db } from "~/lib/db";
import { quizzes, submissions } from "~/lib/db/schema/quiz";

import { eq } from "drizzle-orm";
import { safeParse, string, uuid } from "valibot";
import type { CreateQuizSchema } from "./schema";

export async function getQuizzes() {
  return await db.select().from(quizzes);
}

export async function getQuiz(id: string) {
  const { success } = safeParse(string([uuid()]), id);
  if (!success) return null;

  return await db
    .select()
    .from(quizzes)
    .where(eq(quizzes.id, id))
    .then(([res]) => res ?? null);
}

export async function createQuiz({
  name,
  description,
  creatorId,
  questions,
}: CreateQuizSchema) {
  await db.insert(quizzes).values({
    name,
    description,
    creatorId,
    questions: questions.map((question) => ({
      ...question,
      id: randomUUID(),
      answers: question.answers.map((answer) => ({
        ...answer,
        id: randomUUID(),
      })),
    })),
  });
}

export async function getSubmission(id: string) {
  const { success } = safeParse(string([uuid()]), id);
  if (!success) return null;

  return await db
    .select()
    .from(submissions)
    .where(eq(submissions.id, id))
    .then(([res]) => res ?? null);
}

type CreateSubmissionProps = {
  quizId: string;
  questionId: string;
  userId: string;
};

export async function createSubmission({
  quizId,
  questionId,
  userId,
}: CreateSubmissionProps) {
  "use server";

  const [submission] = await db
    .insert(submissions)
    .values({
      quizId,
      questionId,
      userId,
    })
    .returning();

  return submission;
}
