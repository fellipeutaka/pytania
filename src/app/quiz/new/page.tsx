import Link from "next/link";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { CreateQuizForm } from "./create-quiz-form";

export default function Page() {
  return (
    <main className="container pb-12 pt-16 lg:py-28">
      <Button variant="outline" asChild>
        <Link href="/quiz">
          <Icons.ChevronLeft className="mr-2 size-4" />
          Back to quizzes
        </Link>
      </Button>
      <h1 className="my-4 text-4xl font-bold">New Quiz</h1>
      <CreateQuizForm />
    </main>
  );
}
