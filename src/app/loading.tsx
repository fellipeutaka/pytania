import { Icons } from "~/components/icons";

export default function Loading() {
	return (
		<div className="grid place-content-center">
			<Icons.Loader className="size-8 animate-spin" />
		</div>
	);
}
