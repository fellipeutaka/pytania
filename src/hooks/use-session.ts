import { useSession as useAuthSession } from "next-auth/react";

export function useSession() {
  const { data: session, status, update } = useAuthSession();

  return {
    session,
    status,
    update,
  };
}
