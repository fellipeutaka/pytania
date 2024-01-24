import { wrap } from "@decs/typeschema";
import { omit } from "valibot";
import { createQuiz } from "~/services/quiz";
import { createQuizSchema } from "~/services/quiz/schema";
import { protectedProcedure, router } from "../server";

export const quizRouter = router({
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
