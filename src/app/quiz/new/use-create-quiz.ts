import { TRPCClientError } from "@trpc/client";
import { useState } from "react";

import { toast } from "sonner";
import { type Output, omit } from "valibot";

import { useFieldArray, useForm } from "~/components/ui/form";
import { api } from "~/lib/api/client";
import { createQuizSchema } from "~/services/quiz/schema";

const schema = omit(createQuizSchema, ["creatorId"]);

export type CreateQuizSchema = Output<typeof schema>;

const errorMap: Record<number | "default", string> = {
  429: "You are doing that too much. Please try again later.",
  default: "An error occurred while creating the quiz. Please try again.",
};

export function useCreateQuiz() {
  const form = useForm({
    schema,
    defaultValues: {
      name: "",
      description: "",
      questions: [
        {
          text: "Question 1",
          answers: [
            {
              text: "",
              isCorrect: false,
            },
          ],
        },
      ],
    },
  });
  const questions = useFieldArray({
    name: "questions",
    control: form.control,
  });
  const watchQuestions = form.watch("questions", questions.fields);
  const [currentQuestion, setCurrentQuestion] = useState("0");

  const createQuizMutation = api.quiz.create.useMutation();

  const handleCreateQuiz = form.handleSubmit(
    ({ name, description, questions }) => {
      toast.promise(
        createQuizMutation.mutateAsync({
          name,
          description,
          questions,
        }),
        {
          loading: "Loading...",
          success() {
            form.reset();
            return "Quiz created";
          },
          error(err) {
            if (err instanceof TRPCClientError) {
              return (
                errorMap[(err.meta?.response as Response).status] ??
                errorMap.default
              );
            }
            return errorMap.default;
          },
        },
      );
    },
  );

  const isLoading = createQuizMutation.isPending;

  return {
    form,
    questions,
    watchQuestions,
    currentQuestion,
    setCurrentQuestion,
    handleCreateQuiz,
    isLoading,
  };
}
