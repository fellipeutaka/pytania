import { type Output, object, string, uuid } from "valibot";

export const createSubmissionSchema = object({
  quizId: string([uuid()]),
  questionId: string([uuid()]),
});

export type CreateSubmissionSchema = Output<typeof createSubmissionSchema>;
