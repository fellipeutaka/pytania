import { wrap } from "@decs/typeschema";
import { omit, string, uuid } from "valibot";
import { createQuiz, getQuiz, getQuizzes } from "~/services/quiz";
import { createQuizSchema } from "~/services/quiz/schema";
import { protectedProcedure, publicProcedure, router } from "../server";

export const quizRouter = router({
  findMany: publicProcedure.query(async () => {
    return await getQuizzes();
  }),
  findUnique: publicProcedure
    .input(wrap(string([uuid()])))
    .query(async ({ input }) => {
      return await getQuiz(input);
    }),
  create: protectedProcedure
    .input(wrap(omit(createQuizSchema, ["creatorId"])))
    .mutation(async ({ input, ctx: { session } }) => {
      await createQuiz({
        ...input,
        creatorId: session.user.id,
      });
    }),
});

export type QuizRouter = typeof quizRouter;
