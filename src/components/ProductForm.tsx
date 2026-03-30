"use client";

import type { FormEvent, RefObject } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/types/product";
import {
  ProductImageUploader,
  type ProductImageUploaderHandle,
} from "@/components/ProductImageUploader";

const EMPTY_IMAGES: string[] = [];

type Props = {
  product?: Product | null;
  error?: string | null;
  pending?: boolean;
  uploading?: boolean;
  submitLabel: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void | Promise<void>;
  imagesRef: RefObject<ProductImageUploaderHandle | null>;
};

export function ProductForm({
  product,
  error,
  pending,
  uploading,
  submitLabel,
  onSubmit,
  imagesRef,
}: Props) {
  const sizesDefault = product?.sizes?.join(", ") ?? "";
  const busy = Boolean(pending || uploading);

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-6">
      {error ? (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {/* {!product ? (
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            ID (optional, for fixed IDs when seeding)
          </label>
          <input
            name="id"
            type="text"
            placeholder="Leave empty for auto UUID"
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
      ) : null} */}

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
        </label>
        <input
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Price (BDT)
          </label>
          <input
            name="price"
            type="number"
            required
            min={0}
            step={1}
            defaultValue={product?.price}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Category
          </label>
          <select
            name="category"
            required
            defaultValue={product?.category ?? "casual"}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={product?.description}
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Sizes (comma-separated)
        </label>
        <input
          name="sizes"
          type="text"
          defaultValue={sizesDefault}
          placeholder="S, M, L, XL"
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 shadow-sm outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-100"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Images
        </label>
        <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-400">
          Upload to Supabase Storage, preview, reorder (↑↓), or add external
          URLs.
        </p>
        <ProductImageUploader
          ref={imagesRef}
          key={product?.id ?? "new"}
          initialUrls={product?.images ?? EMPTY_IMAGES}
          disabled={busy}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="featured"
          id="featured"
          defaultChecked={product?.featured}
          value="true"
          className="size-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-600"
        />
        <label
          htmlFor="featured"
          className="text-sm text-zinc-700 dark:text-zinc-300"
        >
          Featured
        </label>
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-60 dark:focus:ring-offset-zinc-900"
        >
          {uploading ? "Uploading…" : pending ? "Saving…" : submitLabel}
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
