import type { Metadata } from "next";
import Link from "next/link";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export const metadata: Metadata = {
	title: "429: Too many request",
};

export default function Page() {
	return (
		<main className="grid place-content-center gap-4 text-center">
			<h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
				429
			</h1>
			<h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
				Too many requests!
			</h2>
			<Button className="mx-auto w-max" asChild={true}>
				<Link href="/">
					<Icons.ChevronLeft className="mr-2 size-4" />
					Go back home
				</Link>
			</Button>
		</main>
	);
}
