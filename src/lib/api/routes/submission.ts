import { wrap } from "@decs/typeschema";
import { eq } from "drizzle-orm";
import { string, uuid } from "valibot";
import { submissions } from "~/lib/db/schema/quiz";
import { createSubmissionSchema } from "../dtos/submission";
import { protectedProcedure, publicProcedure, router } from "../server";

export const submissionRouter = router({
  findUnique: publicProcedure
    .input(wrap(string([uuid()])))
    .query(async ({ input, ctx: { db } }) => {
      return await db
        .select()
        .from(submissions)
        .where(eq(submissions.id, input))
        .then((res) => res.at(0) ?? null);
    }),
  create: protectedProcedure
    .input(wrap(createSubmissionSchema))
    .mutation(async ({ input, ctx: { session, db } }) => {
      const { quizId, questionId } = input;
      const [submission] = await db
        .insert(submissions)
        .values({
          quizId,
          questionId,
          userId: session.user.id,
        })
        .returning();

      return submission;
    }),
});

export type SubmissionRouter = typeof submissionRouter;
