"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { useAuth } from "@/lib/useAuth";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login();
    router.push(searchParams.get("redirect") || "/settings");
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center">
      <Logo className="mb-8" />
      <Card className="w-full">
        <h1 className="text-lg font-semibold text-text">Sign in</h1>
        <p className="mt-1 text-sm text-text-muted">
          Enter your work email and password to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="login-email" className="text-xs font-medium text-text-muted">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-base text-text placeholder:text-text-muted focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="text-xs font-medium text-text-muted">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="focus-ring mt-1.5 w-full rounded-lg border border-border bg-surface-raised px-3 py-2.5 text-base text-text placeholder:text-text-muted focus:border-primary"
            />
          </div>
          <Button type="submit" className="w-full" size="lg">
            <LogIn className="h-4 w-4" aria-hidden="true" />
            Sign in
          </Button>
        </form>
      </Card>
    </div>
  );
}
