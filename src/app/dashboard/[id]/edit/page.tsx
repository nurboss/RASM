import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/app/actions/products";
import { EditProductForm } from "@/components/EditProductForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

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
            Edit product
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {product.name}
          </p>
        </div>
        <EditProductForm product={product} />
      </div>
    </div>
  );
}
