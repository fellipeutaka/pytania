"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          toast: "group bg-background text-foreground border-border shadow-lg",
          description: "group:text-muted-foreground",
          actionButton: "group:bg-primary group:text-primary-foreground",
          cancelButton: "group:bg-muted group:text-muted-foreground",
        },
      }}
      richColors={true}
      {...props}
    />
  );
}

export { toast } from "sonner";
