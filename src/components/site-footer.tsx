import { siteConfig } from "~/config/site";

import { Icons } from "./icons";
import { Button } from "./ui/button";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0">
      <div className="container flex items-center justify-between md:h-24">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a
            href={siteConfig.links.twitter}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            fellipeutaka
          </a>
          . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild={true}>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <Icons.Github className="size-4" />
              <span className="sr-only">GitHub</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild={true}>
            <a href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
              <Icons.Twitter className="size-4" />
              <span className="sr-only">Twitter</span>
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
