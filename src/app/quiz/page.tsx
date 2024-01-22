import Link from "next/link";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { getQuizzes } from "~/services/quiz";

export const dynamic = "force-dynamic";

export default async function Page() {
  const data = await getQuizzes();

  return (
    <main className="container pb-12 pt-16 lg:py-28">
      <div className="mb-6 flex items-center justify-between motion-safe:animate-fade">
        <h1 className="text-4xl font-bold">Quiz page</h1>
        <Button asChild={true}>
          <Link href="/quiz/new">
            <Icons.Plus className="mr-2 size-4" />
            Create new quiz
          </Link>
        </Button>
      </div>
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
    </main>
  );
}
