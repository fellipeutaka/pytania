import { notFound } from "next/navigation";
import { getQuiz, getSubmission } from "~/services/quiz";
import { SubmissionHeader } from "./submission-header";
import { SubmitForm } from "./submit-form";

type PageProps = {
	params: {
		id: string;
	};
};

export default async function Page({ params }: PageProps) {
	const submission = await getSubmission(params.id);
	if (!submission) notFound();

	const quiz = await getQuiz(submission.quizId);

	// biome-ignore lint/style/noNonNullAssertion: <explanation>
	const question = quiz?.questions.find(
		({ id }) => id === submission.questionId,
	)!;

	const currentQuestionIndex =
		quiz?.questions.findIndex(({ id }) => id === submission.questionId) ?? 1;

	return (
		<main>
			<SubmissionHeader
				currentQuestion={currentQuestionIndex + 1}
				totalQuestions={quiz?.questions.length ?? 1}
				limitTime={question?.limitTime ?? null}
			/>

			<section className="mx-auto mt-4 max-w-4xl px-6 py-4">
				<h2 className="text-2xl font-bold">Question 1</h2>
				<p>{question.text}</p>

				<SubmitForm question={question} />
			</section>
		</main>
	);
}
