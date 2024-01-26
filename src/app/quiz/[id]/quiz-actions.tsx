"use client";

import { redirect } from "next/navigation";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/api/client";

type QuizActionsProps = {
  quizId: string;
  questionId: string;
};

export function QuizActions({ quizId, questionId }: QuizActionsProps) {
  const createSubmission = api.submission.create.useMutation();

  return (
    <div>
      <Button
        size="lg"
        type="submit"
        disabled={createSubmission.isPending}
        onClick={async () => {
          const submission = await createSubmission.mutateAsync({
            quizId,
            questionId,
          });
          redirect(`/submission/${submission.id}`);
        }}
      >
        {createSubmission.isPending && (
          <Icons.Loader className="mr-2 size-4 animate-spin" />
        )}
        Start quiz
        <Icons.ChevronRight className="ml-2 size-4" />
      </Button>
    </div>
  );
}
