"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";

import { email, object, string } from "valibot";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { Dialog } from "./ui/dialog";
import { Form, useForm } from "./ui/form";
import { Separator } from "./ui/separator";
import { TextField } from "./ui/textfield";
import { toast } from "./ui/toast";

type AuthProvider = Required<Parameters<typeof signIn>>[0];

const schema = object({
  email: string([email()]),
});

export function SignInDialog({
  children = <Button size="sm">Sign in</Button>,
}: PropsWithOptionalChildren) {
  const form = useForm({
    schema,
    defaultValues: {
      email: "",
    },
  });

  const handleSignInWithEmail = form.handleSubmit(async ({ email }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast(email);
  });

  const handleSignIn = (provider: AuthProvider) => () => signIn(provider);

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Sign in</Dialog.Title>
        <Dialog.Description>
          Sign in to play quizzes, save your progress, and more.
        </Dialog.Description>
        <Form {...form}>
          <form onSubmit={handleSignInWithEmail} className="space-y-6">
            <Form.Field
              control={form.control}
              name="email"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Email</Form.Label>
                  <TextField>
                    <Form.Control>
                      <TextField.Input
                        placeholder="name@example.com"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        disabled={isLoading}
                        {...field}
                      />
                    </Form.Control>
                  </TextField>
                  <Form.Message />
                </Form.Item>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={isLoading || !form.formState.isDirty}
            >
              {isLoading && (
                <Icons.Loader className="mr-2 size-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </form>
        </Form>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <Separator />
          <p className="w-fit text-xs uppercase text-muted-foreground">
            Or continue with
          </p>
          <Separator />
        </div>
        <div className="grid gap-2">
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={handleSignIn("google")}
          >
            {isLoading ? (
              <Icons.Loader className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.Google className="mr-2 size-4" />
            )}
            <span>Google</span>
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={handleSignIn("discord")}
          >
            {isLoading ? (
              <Icons.Loader className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.Discord className="mr-2 size-4" />
            )}
            <span>Discord</span>
          </Button>
          <Button
            variant="outline"
            disabled={isLoading}
            onClick={handleSignIn("github")}
          >
            {isLoading ? (
              <Icons.Loader className="mr-2 size-4 animate-spin" />
            ) : (
              <Icons.Github className="mr-2 size-4" />
            )}
            <span>GitHub</span>
          </Button>
        </div>
        <p className="px-8 text-center text-xs text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Dialog.Close asChild>
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>
          </Dialog.Close>{" "}
          and{" "}
          <Dialog.Close asChild>
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
          </Dialog.Close>
          .
        </p>
      </Dialog.Content>
    </Dialog>
  );
}
