import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./routes";

export const api = createTRPCReact<AppRouter>();
