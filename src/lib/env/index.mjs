import { createEnv } from "@nobara/next";
import { url, minLength, string } from "valibot";

export const env = createEnv({
  server: {
    UPSTASH_REDIS_REST_URL: string([url()]),
    UPSTASH_REDIS_REST_TOKEN: string([minLength(1)]),

    DATABASE_URL: string([minLength(1)]),

    RESEND_API_KEY: string([minLength(1)]),

    NEXTAUTH_SECRET: string([minLength(1)]),

    DISCORD_CLIENT_ID: string([minLength(1)]),
    DISCORD_CLIENT_SECRET: string([minLength(1)]),

    GOOGLE_CLIENT_ID: string([minLength(1)]),
    GOOGLE_CLIENT_SECRET: string([minLength(1)]),

    GITHUB_CLIENT_ID: string([minLength(1)]),
    GITHUB_CLIENT_SECRET: string([minLength(1)]),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: {},
});
