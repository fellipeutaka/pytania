import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { z } from "zod";

import { db } from "~/lib/db";
import { quizzes } from "~/lib/db/schema/quiz";

type PageProps = {
  params: {
    id: string;
  };
};

async function getQuiz(id: string) {
  const { success } = z.string().uuid().safeParse(id);
  if (!success) {
    return null;
  }

  const [data] = await db.select().from(quizzes).where(eq(quizzes.id, id));

  if (!data) {
    return null;
  }

  return data;
}

export default async function Page({ params: { id } }: PageProps) {
  const data = await getQuiz(id);
  if (!data) {
    notFound();
  }

  return (
    <main>
      <h1>Quiz page {data.name}</h1>
    </main>
  );
}
