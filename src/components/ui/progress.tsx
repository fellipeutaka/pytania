"use client";

import { forwardRef } from "react";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { tv } from "mizuhara/utils";

export const ProgressStyles = {
  Root: tv({
    base: ["relative h-4 w-full overflow-hidden rounded-full bg-secondary"],
  }),
  Indicator: tv({
    base: [
      "size-full flex-1 bg-primary transition-all dark:bg-primary-foreground",
    ],
  }),
};

export type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  indicatorClassName?: string;
};

export const Progress = forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, indicatorClassName, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={ProgressStyles.Root({ className })}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={ProgressStyles.Indicator({ className: indicatorClassName })}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
