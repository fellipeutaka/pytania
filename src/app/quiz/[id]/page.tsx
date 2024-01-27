import { notFound } from "next/navigation";

import { api } from "~/lib/api/server";
import { QuizInteractions } from "./quiz-interactions";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: PageProps) {
  try {
    const quiz = await api.quiz.findUnique.query(id);
    if (!quiz) notFound();

    return (
      <main className="grid place-content-center gap-4 text-center">
        <h1 className="text-balance text-3xl font-bold leading-tight sm:text-4xl">
          {quiz.name}
        </h1>
        <p className="text-pretty leading-relaxed text-muted-foreground">
          {quiz.description}
        </p>
        <QuizInteractions quiz={quiz} />
      </main>
    );
  } catch (err) {
    console.error(err);

    return (
      <div>
        <h1>Something went wrong</h1>
        <pre>{JSON.stringify(err, null, 2)}</pre>
      </div>
    );
  }
}
