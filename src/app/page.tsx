import Link from "next/link";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";

export default function Page() {
  return (
    <main className="container space-y-6 pb-12 pt-16 text-center lg:py-28">
      <h1 className="text-balance text-4xl font-extrabold tracking-tight motion-safe:animate-fade-up sm:text-5xl md:text-6xl lg:text-7xl">
        <span className="bg-gradient-to-r from-cyan-12 to-cyan-6 bg-clip-text text-transparent">
          Unlock
        </span>
        Your Mind's Potential
      </h1>
      <h2 className="mx-auto max-w-[42rem] text-balance leading-normal text-muted-foreground motion-safe:animate-fade-up motion-safe:animate-delay-150 sm:text-xl sm:leading-8">
        Explore engaging quizzes and challenges to enhance your learning
        experience. Join the community of knowledge seekers today.
      </h2>
      <div className="flex items-center justify-center gap-4 motion-safe:animate-fade-up motion-safe:animate-delay-300">
        <Button asChild>
          <Link href="/quiz">Get Started</Link>
        </Button>
        <Button className="h-11 px-8" variant="outline" asChild>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icons.Github className="mr-2 size-4" />
            GitHub
          </a>
        </Button>
      </div>
    </main>
  );
}
