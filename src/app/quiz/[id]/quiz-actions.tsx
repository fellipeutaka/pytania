"use client";

import { useRouter } from "next/navigation";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { WithSignInDialog } from "~/components/utils/with-sign-in-dialog";
import { useSession } from "~/hooks/use-session";
import { api } from "~/lib/api/client";

type QuizActionsProps = {
  quizId: string;
  questionId: string;
};

export function QuizActions({ quizId, questionId }: QuizActionsProps) {
  const createSubmission = api.submission.create.useMutation();
  const { session } = useSession();
  const router = useRouter();

  const handleCreateSubmission = session
    ? async () => {
        const submission = await createSubmission.mutateAsync({
          quizId,
          questionId,
        });
        router.replace(`/submission/${submission.id}`);
      }
    : undefined;

  return (
    <div>
      <WithSignInDialog session={session}>
        <Button
          size="lg"
          disabled={createSubmission.isPending}
          onClick={handleCreateSubmission}
        >
          {createSubmission.isPending && (
            <Icons.Loader className="mr-2 size-4 animate-spin" />
          )}
          Start quiz
          <Icons.ChevronRight className="ml-2 size-4" />
        </Button>
      </WithSignInDialog>
    </div>
  );
}
