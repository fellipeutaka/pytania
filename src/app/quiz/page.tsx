import Link from "next/link";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { helpers } from "~/lib/api/server";
import { QuizList } from "./quiz-list";

export const revalidate = 0;

export default async function Page() {
  await helpers.quiz.findMany.prefetch();

  return (
    <main className="container pb-12 pt-16 lg:py-28">
      <div className="mb-6 flex items-center justify-between motion-safe:animate-fade">
        <h1 className="text-4xl font-bold">Quiz page</h1>
        <Button asChild>
          <Link href="/quiz/new">
            <Icons.Plus className="mr-2 size-4" />
            Create new quiz
          </Link>
        </Button>
      </div>
      <HydrationBoundary state={dehydrate(helpers.queryClient)}>
        <QuizList />
      </HydrationBoundary>
    </main>
  );
}
