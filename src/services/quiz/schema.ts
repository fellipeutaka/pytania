import { z } from "zod";

const nonEmptyString = z.string().trim().min(1);

export const createQuizSchema = z.object({
  name: nonEmptyString,
  description: nonEmptyString,
  creatorId: z.string().uuid(),
  questions: z.array(
    z.object({
      text: nonEmptyString,
      answers: z.array(
        z.object({
          text: nonEmptyString,
          isCorrect: z.boolean(),
        }),
      ),
    }),
  ),
});

export type CreateQuizSchema = z.output<typeof createQuizSchema>;
