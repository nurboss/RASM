import Link from "next/link";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  const thumb = product.images?.[0];
  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {thumb ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumb}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-400">
            No image
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {product.name}
          </h3>
          <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
            {product.category}
          </span>
        </div>
        <p className="mt-2 font-mono text-sm tabular-nums text-zinc-900 dark:text-zinc-100">
          ৳{product.price.toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

