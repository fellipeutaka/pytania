import { useState } from "react";

import { toast } from "sonner";
import { type Output, omit } from "valibot";

import { useFieldArray, useForm } from "~/components/ui/form";
import { useSession } from "~/hooks/use-session";
import { type ApiError, api } from "~/lib/api";
import { createQuizSchema } from "~/services/quiz/schema";

const schema = omit(createQuizSchema, ["creatorId"]);

export type CreateQuizSchema = Output<typeof schema>;

const errorMap: Record<number | "default", string> = {
	429: "You are doing that too much. Please try again later.",
	default: "An error occurred while creating the quiz. Please try again.",
};

export function useCreateQuiz() {
	const { session } = useSession();

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

	const handleCreateQuiz = form.handleSubmit(
		({ name, description, questions }) => {
			toast.promise(
				api.post("/api/quiz", {
					name,
					description,
					creatorId: session?.user.id,
					questions,
				}),
				{
					loading: "Loading...",
					success() {
						form.reset();
						return "Quiz created";
					},
					error(err: ApiError) {
						return errorMap[err.status] ?? errorMap.default;
					},
				},
			);
		},
	);

	const isLoading = form.formState.isSubmitting;

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
