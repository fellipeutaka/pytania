"use client";

import { forwardRef } from "react";

import { Root } from "@radix-ui/react-label";
import { cn } from "mizuhara/utils";

export type LabelProps = React.ComponentPropsWithoutRef<typeof Root> & {
  htmlFor: string;
};

export const Label = forwardRef<React.ElementRef<typeof Root>, LabelProps>(
  ({ className, htmlFor, ...props }, ref) => (
    <Root
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className,
      )}
      htmlFor={htmlFor}
      {...props}
    />
  ),
);
Label.displayName = "Label";
