import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { NextRequest } from "next/server";
import { endpoint } from "~/config/api";
import { appRouter } from "~/lib/api/routes";
import { createTRPCContext } from "~/lib/api/server";
import { isDev } from "~/utils";

/**
 * This wraps the `createTRPCContext` helper and provides the required context for the tRPC API when
 * handling a HTTP request (e.g. when you make requests from Client Components).
 */
const createContext = async (req: NextRequest) => {
  return await createTRPCContext({
    headers: req.headers,
  });
};

const handler = (req: NextRequest) => {
  return fetchRequestHandler({
    endpoint,
    req,
    router: appRouter,
    createContext: () => createContext(req),
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
