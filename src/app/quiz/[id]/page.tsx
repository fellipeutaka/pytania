import { notFound } from "next/navigation";

import { api } from "~/lib/api/server";
import { auth } from "~/lib/auth";
import { CreatorActions } from "./creator-actions";
import { QuizActions } from "./quiz-actions";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: PageProps) {
  const quiz = await api.quiz.findUnique.query(id);
  if (!quiz) notFound();

  const session = await auth();

  return (
    <main className="grid place-content-center gap-4 text-center">
      <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {quiz.name}
      </h1>
      <p className="text-pretty leading-relaxed text-muted-foreground">
        {quiz.description}
      </p>
      {session ? (
        quiz.creatorId === session.user.id ? (
          <CreatorActions />
        ) : (
          <QuizActions
            {...{
              quizId: id,
              questionId: quiz.questions[0].id,
              userId: session.user.id,
            }}
          />
        )
      ) : (
        <p>Sign in first</p>
      )}
    </main>
  );
}
