import Link from "next/link";
import { getProducts } from "@/app/actions/products";
import { ProductTable } from "@/components/ProductTable";

function envConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export default async function DashboardPage() {
  const configured = envConfigured();
  const products = configured ? await getProducts() : [];

  return (
    <div className="min-h-full flex-1 bg-zinc-100 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-amber-800 dark:text-amber-500">
              Panjabi store
            </p>
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Products dashboard
            </h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400">
              Create, edit, and delete products. Data is stored in Supabase.
            </p>
          </div>
          <Link
            href="/dashboard/new"
            className="inline-flex shrink-0 items-center justify-center rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-950"
          >
            Add product
          </Link>
        </header>

        {!configured ? (
          <div
            className="mb-8 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-100"
            role="status"
          >
            <p className="font-medium">Supabase environment variables are missing.</p>
            <p className="mt-1 text-amber-900/90 dark:text-amber-200/90">
              Copy <code className="rounded bg-amber-100/80 px-1 py-0.5 font-mono text-xs dark:bg-amber-900/60">.env.example</code> to{" "}
              <code className="rounded bg-amber-100/80 px-1 py-0.5 font-mono text-xs dark:bg-amber-900/60">.env.local</code> and set{" "}
              <code className="rounded bg-amber-100/80 px-1 py-0.5 font-mono text-xs dark:bg-amber-900/60">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="rounded bg-amber-100/80 px-1 py-0.5 font-mono text-xs dark:bg-amber-900/60">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>.
              Run the SQL in <code className="rounded bg-amber-100/80 px-1 py-0.5 font-mono text-xs dark:bg-amber-900/60">supabase/migrations/001_products.sql</code> in the Supabase SQL editor, then restart <code className="rounded bg-amber-100/80 px-1 py-0.5 font-mono text-xs dark:bg-amber-900/60">npm run dev</code>.
            </p>
          </div>
        ) : null}

        <ProductTable products={products} />
      </div>
    </div>
  );
}
