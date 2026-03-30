import Link from "next/link";
import { deleteProduct } from "@/app/actions/products";
import { ConfirmDeleteButton } from "@/components/ConfirmDeleteButton";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export function ProductTable({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50/50 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
        <p className="text-zinc-600 dark:text-zinc-400">
          No products yet. Add your first product or run the seed SQL in Supabase.
        </p>
        <Link
          href="/dashboard/new"
          className="mt-4 inline-block text-sm font-medium text-amber-700 underline hover:text-amber-800 dark:text-amber-500"
        >
          Create product
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {products.map((p) => {
              const thumb = p.images[0];
              return (
                <tr key={p.id} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                        {thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element -- external product URLs vary by host
                          <img
                            src={thumb}
                            alt=""
                            className="size-12 object-cover"
                          />
                        ) : (
                          <div className="flex size-12 items-center justify-center text-xs text-zinc-400">
                            —
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-zinc-900 dark:text-zinc-100">
                          {p.name}
                        </div>
                        <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                          {p.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium capitalize text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
                    ৳{p.price.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {p.featured ? (
                      <span className="text-amber-700 dark:text-amber-400">Yes</span>
                    ) : (
                      <span className="text-zinc-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/${encodeURIComponent(p.id)}/edit`}
                        className="rounded-md border border-zinc-200 px-2.5 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        Edit
                      </Link>
                      <ConfirmDeleteButton
                        title="Delete product?"
                        description="This will remove the product and delete any uploaded images from Supabase Storage."
                        action={deleteProduct.bind(null, p.id)}
                        buttonClassName="rounded-md border border-red-200 bg-white px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-900/50 dark:bg-zinc-950 dark:text-red-400 dark:hover:bg-red-950/30"
                        confirmClassName="rounded-lg bg-red-700 px-3 py-2 text-sm font-medium text-white hover:bg-red-800"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
