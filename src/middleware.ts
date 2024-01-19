import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { type NextRequest, NextResponse } from "next/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  // 15 requests from the same IP in 10 seconds
  limiter: Ratelimit.slidingWindow(15, "10 s"),
});

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  return success
    ? NextResponse.next()
    : NextResponse.rewrite(new URL("/blocked", request.url), {
        status: 429,
      });
}

export const config = {
  matcher: ["/quiz/:path*", "/api/quiz"],
};
