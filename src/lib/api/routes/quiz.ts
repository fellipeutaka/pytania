import { randomUUID } from "node:crypto";
import { wrap } from "@decs/typeschema";
import { eq } from "drizzle-orm";
import { string, uuid } from "valibot";
import { quizzes } from "~/lib/db/schema/quiz";
import { createQuizSchema } from "../dtos/quiz";
import { protectedProcedure, publicProcedure, router } from "../server";

export const quizRouter = router({
  findMany: publicProcedure.query(async ({ ctx: { db } }) => {
    const data = await db
      .select({
        id: quizzes.id,
        name: quizzes.name,
        description: quizzes.description,
        creatorId: quizzes.creatorId,
        createdAt: quizzes.createdAt,
      })
      .from(quizzes)
      .execute();

    console.log(data);
    return data;
  }),
  findUnique: publicProcedure
    .input(wrap(string([uuid()])))
    .query(async ({ input, ctx: { db } }) => {
      return await db
        .select()
        .from(quizzes)
        .where(eq(quizzes.id, input))
        .execute()
        .then((res) => res.at(0) ?? null);
    }),
  create: protectedProcedure
    .input(wrap(createQuizSchema))
    .mutation(async ({ input, ctx: { session, db } }) => {
      const { name, description, questions } = input;
      await db
        .insert(quizzes)
        .values({
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
        })
        .execute();
    }),
});

export type QuizRouter = typeof quizRouter;
