"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { api } from "~/lib/api/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { getApiUrl } from "~/utils";
import { Toaster } from "./ui/toast";

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    api.createClient({
      links: [
        httpBatchLink({
          url: getApiUrl(),
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
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
      </api.Provider>
    </QueryClientProvider>
  );
}
