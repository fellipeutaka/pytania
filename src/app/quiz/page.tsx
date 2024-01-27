import Link from "next/link";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { QuizList } from "./quiz-list";

export const revalidate = 30;

export default function Page() {
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
      <QuizList />
    </main>
  );
}
