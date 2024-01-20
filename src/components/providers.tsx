"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { Toaster } from "./ui/toast";

export function Providers({ children }: PropsWithChildren) {
	return (
		<SessionProvider>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem={true}
				disableTransitionOnChange={true}
			>
				{children}
				<Toaster />
			</ThemeProvider>
		</SessionProvider>
	);
}
