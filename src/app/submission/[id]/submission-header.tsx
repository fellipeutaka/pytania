import { Progress } from "~/components/ui/progress";

type SubmissionHeaderProps = {
	currentQuestion: number;
	totalQuestions: number;
	limitTime: number | null;
};

export function SubmissionHeader({
	currentQuestion,
	totalQuestions,
	limitTime,
}: SubmissionHeaderProps) {
	return (
		<div className="sticky left-0 top-14">
			<Progress className="h-3 rounded-none" value={10} max={100} />
			<div className="flex items-center justify-between p-3 font-medium">
				<p>
					Question {currentQuestion} of {totalQuestions}
				</p>
				{limitTime && (
					<p>
						Time remaining:{" "}
						<span className="rounded bg-destructive p-1 tabular-nums text-destructive-foreground">
							00:00
						</span>
					</p>
				)}
			</div>
		</div>
	);
}
