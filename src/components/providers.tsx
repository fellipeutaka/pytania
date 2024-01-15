"use client";

import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

import { Toaster } from "./ui/toast";
const ThemeProvider = dynamic(() =>
  import("next-themes").then((mod) => mod.ThemeProvider),
);

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
