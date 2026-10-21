import Link from "next/link";
import { Suspense } from "react";

import { LogoutButton } from "@/components/logout-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { getServerSession } from "@/server/auth";

export default function Home() {
  return (
    <>
      <header className="flex justify-end border-b px-6 py-3">
        <ThemeToggle />
      </header>
      <main className="grid flex-1 place-items-center">
        <div>
          <h1>Hello!</h1>
          <Suspense fallback={<p>Loading...</p>}>
            <UserGreeting />
          </Suspense>
        </div>
      </main>
    </>
  );
}

async function UserGreeting() {
  const session = await getServerSession();

  return (
    <div>
      {session ? (
        <div className="flex flex-col items-start gap-3">
          <p>Welcome back, {session.user.name}</p>
          <LogoutButton />
        </div>
      ) : (
        <p>
          Please{" "}
          <Link className="underline" href="/login">
            sign in
          </Link>{" "}
          to continue.
        </p>
      )}
    </div>
  );
}
