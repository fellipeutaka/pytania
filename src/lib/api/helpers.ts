import { createServerSideHelpers } from "@trpc/react-query/server";
import { headers } from "next/headers";
import { createTRPCContext } from "./context";
import { appRouter } from "./routes";

/**
 * Create functions you can use for server-side rendering / static generation
 * @link https://trpc.io/docs/v11/client/nextjs/server-side-helpers
 */
export const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: await createTRPCContext({
    headers: headers(),
  }),
});
