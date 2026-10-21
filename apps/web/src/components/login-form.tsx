"use client";

import { Button } from "@la/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@la/ui/components/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@la/ui/components/field";
import { Input } from "@la/ui/components/input";
import { cn } from "@la/ui/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

type AuthMode = "sign-in" | "sign-up";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [error, setError] = useState<string>();
  const [isPending, setIsPending] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(form: HTMLFormElement) {
    setError(undefined);
    setIsPending(true);

    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
      setError("Email and password are required.");
      setIsPending(false);
      return;
    }

    try {
      const result = isSignUp
        ? await authClient.signUp.email({ email, name: email, password })
        : await authClient.signIn.email({ email, password });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError(
        isSignUp
          ? "Unable to create your account. Please try again."
          : "Unable to sign in. Please try again.",
      );
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {isSignUp ? "Create an account" : "Login to your account"}
          </CardTitle>
          <CardDescription>
            {isSignUp
              ? "Enter your email and password to get started"
              : "Enter your email and password to login"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event: React.SyntheticEvent<HTMLFormElement>) => {
              event.preventDefault();
              void handleSubmit(event.currentTarget);
            }}
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  autoComplete="email"
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  id="password"
                  name="password"
                  required
                  type="password"
                />
              </Field>
              {error && <FieldError>{error}</FieldError>}
              <Field>
                <Button disabled={isPending} type="submit">
                  {isPending
                    ? isSignUp
                      ? "Creating account..."
                      : "Logging in..."
                    : isSignUp
                      ? "Sign up"
                      : "Login"}
                </Button>
                <FieldDescription className="text-center">
                  {isSignUp
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <Button
                    className="h-auto p-0 text-xs"
                    disabled={isPending}
                    onClick={() => {
                      setMode(isSignUp ? "sign-in" : "sign-up");
                      setError(undefined);
                    }}
                    type="button"
                    variant="link"
                  >
                    {isSignUp ? "Login" : "Sign up"}
                  </Button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
