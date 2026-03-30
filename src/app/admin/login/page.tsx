import { AdminLoginForm } from "@/components/AdminLoginForm";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminLoginPage({ searchParams }: Props) {
  const sp = await searchParams;
  const next =
    typeof sp.next === "string" && sp.next.startsWith("/") ? sp.next : "/dashboard";
  const showNotAdmin = sp.error === "not_admin";

  return (
    <div className="min-h-full flex-1 bg-zinc-100 px-6 py-16 dark:bg-zinc-950">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Admin login
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Sign in to manage products.
        </p>
        {showNotAdmin ? (
          <div
            className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
            role="status"
          >
            This account is not allowed to access the admin dashboard.
          </div>
        ) : null}
        <div className="mt-6">
          <AdminLoginForm nextPath={next} />
        </div>
      </div>
    </div>
  );
}

