"use client";

import { forwardRef } from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { tv } from "mizuhara/utils";

export const AvatarStyles = {
  Root: tv({
    base: ["relative flex size-10 shrink-0 overflow-hidden rounded-full"],
  }),
  Image: tv({
    base: ["aspect-square size-full"],
  }),
  Fallback: tv({
    base: ["flex size-full items-center justify-center rounded-full bg-muted"],
  }),
};

export type AvatarProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Root
>;

const Root = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={AvatarStyles.Root({ className })}
    {...props}
  />
));
Root.displayName = "Avatar";

export type AvatarImageProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Image
>;

const Image = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={AvatarStyles.Image({ className })}
    {...props}
  />
));
Image.displayName = "Avatar.Image";

export type AvatarFallbackProps = React.ComponentPropsWithoutRef<
  typeof AvatarPrimitive.Fallback
>;

const Fallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={AvatarStyles.Fallback({ className })}
    {...props}
  />
));
Fallback.displayName = "Avatar.Fallback";

export const Avatar = Object.assign(Root, {
  Image,
  Fallback,
});
