"use client";

import type { ErrorPageProps } from "~/@types/utils";
import { Button } from "~/components/ui/button";

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  console.error(error);

  return (
    <div className="grid place-content-center">
      <h1 className="text-5xl font-bold text-destructive">Error</h1>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
