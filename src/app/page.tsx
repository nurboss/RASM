import Link from "next/link";
import { getProducts } from "@/app/actions/products";
import { ProductCard } from "@/components/ProductCard";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-800 dark:text-amber-500">
              Tradition, redefined
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Premium Panjabi for every occasion
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Crafted with love and heritage. Explore premium, casual, and festive
              collections — designed for comfort and celebration.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/collection"
                className="inline-flex rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-amber-800"
              >
                Shop collection
              </Link>
              <Link
                href="/size"
                className="inline-flex rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
              >
                Size guide
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-linear-to-br from-amber-50 via-white to-zinc-50 p-8 shadow-sm dark:border-zinc-800 dark:from-amber-950/40 dark:via-zinc-950 dark:to-zinc-950">
            <div className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              Banner
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Eid-ready festive pieces, premium embroidery, and everyday classics.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="h-24 rounded-2xl bg-amber-200/70 dark:bg-amber-900/40" />
              <div className="h-24 rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-24 rounded-2xl bg-amber-100 dark:bg-amber-950/60" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Featured products
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                A quick look at our latest picks.
              </p>
            </div>
            <Link
              href="/collection"
              className="text-sm font-medium text-amber-800 hover:text-amber-900 dark:text-amber-500 dark:hover:text-amber-400"
            >
              View all →
            </Link>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
