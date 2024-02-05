import { router } from "..";
import { quizRouter } from "./quiz";
import { submissionRouter } from "./submission";

export const appRouter = router({
  quiz: quizRouter,
  submission: submissionRouter,
});

export type AppRouter = typeof appRouter;
