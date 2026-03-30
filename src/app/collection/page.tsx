import { getProducts } from "@/app/actions/products";
import { CollectionClient } from "@/app/collection/CollectionClient";

export default async function CollectionPage() {
  const products = await getProducts();

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Collection
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Explore premium, casual, and festive Panjabi.
        </p>

        <div className="mt-8">
          <CollectionClient products={products} />
        </div>
      </div>
    </div>
  );
}

