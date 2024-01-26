import {
  type Output,
  array,
  boolean,
  minLength,
  object,
  string,
  toTrimmed,
} from "valibot";

export const createQuizSchema = object({
  name: string([toTrimmed(), minLength(1)]),
  description: string([toTrimmed(), minLength(1)]),
  questions: array(
    object({
      text: string([toTrimmed(), minLength(1)]),
      answers: array(
        object({
          text: string([toTrimmed(), minLength(1)]),
          isCorrect: boolean(),
        }),
      ),
    }),
  ),
});

export type CreateQuizSchema = Output<typeof createQuizSchema>;
