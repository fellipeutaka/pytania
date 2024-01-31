import { createServerSideHelpers } from "@trpc/react-query/server";
import { api } from "./server";

/**
 * Create functions you can use for server-side rendering / static generation
 * @link https://trpc.io/docs/v11/client/nextjs/server-side-helpers
 */
export const helpers = createServerSideHelpers({
  client: api,
});
