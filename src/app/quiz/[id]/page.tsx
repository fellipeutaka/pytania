import { notFound } from "next/navigation";

import { auth } from "~/lib/auth";
import { getQuiz } from "~/services/quiz";
import { CreatorActions } from "./creator-actions";
import { QuizActions } from "./quiz-actions";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: PageProps) {
  const data = await getQuiz(id);
  if (!data) notFound();

  const session = await auth();

  return (
    <main className="grid place-content-center gap-4 text-center">
      <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
        {data.name}
      </h1>
      <p className="text-pretty leading-relaxed text-muted-foreground">
        {data.description}
      </p>
      {session ? (
        data.creatorId === session.user.id ? (
          <CreatorActions />
        ) : (
          <QuizActions
            {...{
              quizId: id,
              questionId: data.questions[0].id,
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
