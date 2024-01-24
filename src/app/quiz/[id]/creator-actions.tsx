"use client";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";

export function CreatorActions() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button variant="destructive">
        <Icons.Trash className="size-4 mr-2" />
        Delete quiz
      </Button>
    </div>
  );
}
