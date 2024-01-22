"use client";

import { redirect } from "next/navigation";
import { useTransition } from "react";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { createSubmission } from "~/services/quiz";

type QuizActionsProps = {
  quizId: string;
  questionId: string;
  userId: string;
};

export function QuizActions({ quizId, questionId, userId }: QuizActionsProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <Button
        size="lg"
        type="submit"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const submission = await createSubmission({
              quizId,
              questionId,
              userId,
            });
            redirect(`/submission/${submission.id}`);
          });
        }}
      >
        {isPending && <Icons.Loader className="mr-2 size-4 animate-spin" />}
        Start quiz
        <Icons.ChevronRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}
