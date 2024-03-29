import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { endpoint } from "~/config/api";
import { createTRPCContext } from "~/lib/api/context";
import { appRouter } from "~/lib/api/routes";
import { isDev } from "~/utils";

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint,
    req,
    router: appRouter,
    createContext: () => createTRPCContext(req),
    onError: isDev
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
  });
};

export { handler as GET, handler as POST };
