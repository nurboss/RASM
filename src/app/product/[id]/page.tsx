import { notFound } from "next/navigation";
import { getProduct } from "@/app/actions/products";

type Props = {
  params: Promise<{ id: string }>;
};

function whatsappLink(productName: string) {
  const phone = "8801632963486";
  const text = `Hello! I want to order: ${productName}`;
  const q = new URLSearchParams({ text }).toString();
  return `https://wa.me/${phone}?${q}`;
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="flex-1 bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="aspect-4/3 bg-zinc-100 dark:bg-zinc-900">
                {product.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            </div>
            {product.images?.length ? (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 8).map((url) => (
                  <div
                    key={url}
                    className="aspect-square overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={url} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {product.name}
                </h1>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold capitalize text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                  {product.category}
                </span>
              </div>
              <p className="mt-3 font-mono text-lg tabular-nums text-zinc-900 dark:text-zinc-100">
                ৳{product.price.toLocaleString()}
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                {product.description}
              </p>

              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400">
                  Sizes
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(product.sizes ?? []).map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-zinc-300 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={whatsappLink(product.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-lg bg-amber-700 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-amber-800"
                >
                  Order on WhatsApp
                </a>
                <a
                  href="/collection"
                  className="inline-flex rounded-lg border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  Back to collection
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

