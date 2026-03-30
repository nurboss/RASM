import Link from "next/link";
import { CreateProductForm } from "@/components/CreateProductForm";

export default function NewProductPage() {
  return (
    <div className="min-h-full flex-1 bg-zinc-100 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="text-sm font-medium text-amber-800 hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-400"
          >
            ← Back to dashboard
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            New product
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Add a product to the catalog.
          </p>
        </div>
        <CreateProductForm />
      </div>
    </div>
  );
}
