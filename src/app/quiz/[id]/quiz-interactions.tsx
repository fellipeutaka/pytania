"use client";

import type { api } from "~/lib/api/server";
import { QuizActions } from "./quiz-actions";

type QuizInteractionsProps = {
  quiz: NonNullable<Awaited<ReturnType<typeof api.quiz.findUnique.query>>>;
};

export function QuizInteractions({ quiz }: QuizInteractionsProps) {
  // const { session } = useSession();

  return (
    <QuizActions
      {...{
        quizId: quiz.id,
        questionId: quiz.questions[0].id,
      }}
    />
  );

  // return quiz.creatorId === session?.user.id ? (
  //   <CreatorActions />
  // ) : (
  //   <QuizActions
  //     {...{
  //       quizId: quiz.id,
  //       questionId: quiz.questions[0].id,
  //     }}
  //   />
  // );
}
