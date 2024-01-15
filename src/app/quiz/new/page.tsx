import { auth } from "~/lib/auth";

import { CreateQuizForm } from "./create-quiz-form";

export default async function Page() {
  const session = await auth();

  return (
    <main className="container pb-12 pt-16 lg:py-28">
      <h1 className="mb-4 text-4xl font-bold">New Quiz</h1>

      {session ? <CreateQuizForm session={session} /> : <p>Not logged</p>}
    </main>
  );
}
