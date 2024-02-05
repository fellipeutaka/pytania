import { experimental_nextCacheLink } from "@trpc/next/app-dir/links/nextCache";
import { experimental_createTRPCNextAppDirServer } from "@trpc/next/app-dir/server";
import { headers } from "next/headers";

import { type AppRouter, appRouter } from "./routes";

import { createTRPCContext } from "./context";

export const api = experimental_createTRPCNextAppDirServer<AppRouter>({
  config() {
    return {
      links: [
        experimental_nextCacheLink({
          router: appRouter,
          createContext: () =>
            createTRPCContext({
              headers: headers(),
            }),
        }),
      ],
    };
  },
});
