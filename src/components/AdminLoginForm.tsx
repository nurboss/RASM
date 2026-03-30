"use client";

import { startTransition, useActionState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type State = { error: string | null };

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const router = useRouter();
  const supabase = createClient();

  const [state, submit, pending] = useActionState(
    async (prev: State, formData: FormData) => {
      const email = String(formData.get("email") ?? "").trim();
      const password = String(formData.get("password") ?? "");
      if (!email || !password) return { error: "Email and password are required." };

      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };

      // middleware will allow /dashboard after session is set
      router.replace(nextPath);
      router.refresh();
      return prev;
    },
    { error: null }
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        startTransition(() => submit(fd));
      }}
      className="space-y-4"
    >
      {state.error ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {state.error}
        </div>
      ) : null}

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          required
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Password
        </label>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          required
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-zinc-950"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

