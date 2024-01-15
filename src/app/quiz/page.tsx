import Link from "next/link";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { db } from "~/lib/db";
import { quizzes } from "~/lib/db/schema/quiz";

export default async function Page() {
  const data = await db.select().from(quizzes);

  return (
    <main>
      <h1>Quiz page</h1>
      <div className="grid">
        {data.map((quiz) => (
          <Link href={`/quiz/${quiz.id}`} key={quiz.id}>
            <h2>{quiz.name}</h2>
            <p>{quiz.description}</p>
          </Link>
        ))}
      </div>
      <Button asChild>
        <Link href="/quiz/new">
          <Icons.Plus className="mr-2 size-4" />
          Create new quiz
        </Link>
      </Button>
    </main>
  );
}
