import Link from "next/link";

import { siteConfig } from "~/config/site";
import { auth } from "~/lib/auth";

import { Icons } from "./icons";
import { ModeToggle } from "./mode-toggle";
import { Profile } from "./profile";
import { SignInDialog } from "./sign-in-dialog";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-full max-w-screen-2xl items-center justify-between">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <Icons.Logo className="h-6 w-auto" />
          <span className="hidden font-bold sm:inline">{siteConfig.name}</span>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {session ? <Profile session={session} /> : <SignInDialog />}
        </div>
      </div>
    </header>
  );
}
