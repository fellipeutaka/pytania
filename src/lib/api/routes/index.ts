import { router } from "../server";
import { quizRouter } from "./quiz";

export const appRouter = router({
  quiz: quizRouter,
});

export type AppRouter = typeof appRouter;
