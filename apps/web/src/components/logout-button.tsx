"use client";

import { Button } from "@la/ui/components/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string>();

  async function handleLogout() {
    setIsPending(true);
    setError(undefined);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError(result.error.message);
        return;
      }

      router.refresh();
    } catch {
      setError("Unable to log out. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <Button disabled={isPending} onClick={() => void handleLogout()}>
        {isPending ? "Logging out..." : "Log out"}
      </Button>
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
