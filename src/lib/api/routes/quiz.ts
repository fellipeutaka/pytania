import { randomUUID } from "node:crypto";
import { wrap } from "@decs/typeschema";
import { eq } from "drizzle-orm";
import { object, string, uuid } from "valibot";
import { quizzes } from "~/lib/db/schema/quiz";
import { protectedProcedure, publicProcedure, router } from "..";
import { createQuizSchema } from "../dtos/quiz";

export const quizRouter = router({
  findMany: publicProcedure.query(async ({ ctx: { db } }) => {
    return await db
      .select({
        id: quizzes.id,
        name: quizzes.name,
        description: quizzes.description,
        creatorId: quizzes.creatorId,
        createdAt: quizzes.createdAt,
      })
      .from(quizzes);
  }),
  findUnique: publicProcedure
    .input(wrap(object({ id: string([uuid()]) })))
    .query(async ({ input: { id }, ctx: { db } }) => {
      return await db
        .select()
        .from(quizzes)
        .where(eq(quizzes.id, id))
        .then((res) => res.at(0) ?? null);
    }),
  create: protectedProcedure
    .input(wrap(createQuizSchema))
    .mutation(async ({ input, ctx: { session, db } }) => {
      const { name, description, questions } = input;
      await db.insert(quizzes).values({
        name,
        description,
        creatorId: session.user.id,
        questions: questions.map((question) => ({
          ...question,
          id: randomUUID(),
          answers: question.answers.map((answer) => ({
            ...answer,
            id: randomUUID(),
          })),
        })),
      });
    }),
});

export type QuizRouter = typeof quizRouter;
