"use client";

import { toast } from "sonner";
import { object, string } from "valibot";

import { Button } from "~/components/ui/button";
import { Form, useForm } from "~/components/ui/form";
import { RadioGroup } from "~/components/ui/radio-group";

type SubmitFormProps = {
	question: {
		text: string;
		answers: {
			id: string;
			text: string;
			isCorrect: boolean;
		}[];
	};
};

const schema = object({
	answer: string("Please select an answer"),
});

export function SubmitForm({ question }: SubmitFormProps) {
	const form = useForm({
		schema,
		defaultValues: {
			answer: "",
		},
	});

	const handleSubmit = form.handleSubmit(async ({ answer }) => {
		toast(question.answers.find((a) => a.id === answer)?.text);
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit}>
				<Form.Field
					control={form.control}
					name="answer"
					render={({ field }) => (
						<Form.Item className="space-y-3">
							<Form.Control>
								<RadioGroup
									onValueChange={field.onChange}
									defaultValue={field.value}
									className="mt-6"
								>
									{question.answers.map((answer) => (
										<Form.Item key={answer.id}>
											<Form.Control>
												<RadioGroup.Item value={answer.id}>
													<p className="leading-relaxed">{answer.text}</p>
												</RadioGroup.Item>
											</Form.Control>
										</Form.Item>
									))}
								</RadioGroup>
							</Form.Control>
						</Form.Item>
					)}
				/>

				<div className="mt-6 flex grid-cols-2 flex-col gap-4 md:flex-row md:justify-end">
					<Button disabled={!form.formState.isDirty} type="submit">
						Confirm answer
					</Button>
				</div>
			</form>
		</Form>
	);
}
