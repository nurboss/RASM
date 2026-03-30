"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard";

export function CollectionClient({ products }: { products: Product[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [featured, setFeatured] = useState<"all" | "featured">("all");

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (featured === "featured" && !p.featured) return false;
      if (!qq) return true;
      return (
        p.name.toLowerCase().includes(qq) ||
        p.description.toLowerCase().includes(qq)
      );
    });
  }, [products, q, category, featured]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
            Search
          </label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search products…"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="all">All</option>
            <option value="premium">Premium</option>
            <option value="casual">Casual</option>
            <option value="festive">Festive</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
            Featured
          </label>
          <select
            value={featured}
            onChange={(e) =>
              setFeatured(e.target.value as "all" | "featured")
            }
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <option value="all">All</option>
            <option value="featured">Featured only</option>
          </select>
        </div>
      </div>

      <div className="text-sm text-zinc-600 dark:text-zinc-400">
        Showing <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filtered.length}</span>{" "}
        products
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

