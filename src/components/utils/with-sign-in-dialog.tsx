import type { Session } from "next-auth/types";
import type { PropsWithChildren } from "~/@types/utils";
import { SignInDialog } from "~/components/sign-in-dialog";

export function WithSignInDialog({
  children,
  session,
}: PropsWithChildren<{ session: Session | null }>) {
  return session ? <>{children}</> : <SignInDialog>{children}</SignInDialog>;
}
