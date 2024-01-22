import { safeParse } from "valibot";
import { createQuiz } from "~/services/quiz";
import { createQuizSchema } from "~/services/quiz/schema";

export async function POST(request: Request) {
  const body = await request.json();

  const parsedBody = safeParse(createQuizSchema, body);

  if (!parsedBody.success) {
    return new Response(JSON.stringify(parsedBody.error), {
      status: 400,
    });
  }

  try {
    await createQuiz(parsedBody.data);

    return new Response(null, {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(null, {
      status: 500,
    });
  }
}
