"use client";

import Link from "next/link";
import { api } from "~/lib/api/client";

export function QuizList() {
  const [data] = api.quiz.findMany.useSuspenseQuery();

  return (
    <div className="grid grid-cols-1 gap-6 motion-safe:animate-fade-right motion-safe:animate-delay-75 md:grid-cols-2 xl:grid-cols-3">
      {data.map((quiz) => (
        <Link
          className="group flex max-h-72 flex-col items-start gap-4 rounded-lg border p-6 transition-colors hover:border-cyan-8 select-none"
          href={`/quiz/${quiz.id}`}
          key={quiz.id}
        >
          {/* <Image src={quiz.image} alt={quiz.name} /> */}
          <div className="min-w-0 flex-1">
            <h2 className="font-medium transition-colors group-hover:text-cyan-8">
              {quiz.name}
            </h2>
            <p className="truncate text-sm text-muted-foreground">
              {quiz.description}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
