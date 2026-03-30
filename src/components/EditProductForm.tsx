"use client";

import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { updateProduct } from "@/app/actions/products";
import { ProductForm } from "@/components/ProductForm";
import type { ProductImageUploaderHandle } from "@/components/ProductImageUploader";
import type { Product } from "@/types/product";

export function EditProductForm({ product }: { product: Product }) {
  const imagesRef = useRef<ProductImageUploaderHandle>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null }, formData: FormData) => {
      const result = await updateProduct(product.id, formData);
      if (
        result &&
        typeof result === "object" &&
        "error" in result &&
        result.error
      ) {
        return { error: result.error };
      }
      return prev;
    },
    { error: null as string | null }
  );

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploadError(null);
    const fd = new FormData(e.currentTarget);
    if (!imagesRef.current) {
      setUploadError("Image uploader is not ready.");
      return;
    }
    setUploading(true);
    try {
      const urls = await imagesRef.current.getFinalUrls(product.id);
      fd.set("images", JSON.stringify(urls));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      return;
    } finally {
      setUploading(false);
    }
    startTransition(() => formAction(fd));
  }

  return (
    <ProductForm
      product={product}
      onSubmit={handleSubmit}
      imagesRef={imagesRef}
      error={state.error ?? uploadError}
      pending={pending}
      uploading={uploading}
      submitLabel="Save changes"
    />
  );
}
