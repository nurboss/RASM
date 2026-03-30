"use client";

import { startTransition, useActionState, useRef, useState, type FormEvent } from "react";
import { createProduct } from "@/app/actions/products";
import { ProductForm } from "@/components/ProductForm";
import type { ProductImageUploaderHandle } from "@/components/ProductImageUploader";

export function CreateProductForm() {
  const provisionalId = useRef(crypto.randomUUID());
  const imagesRef = useRef<ProductImageUploaderHandle>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const [state, formAction, pending] = useActionState(
    async (prev: { error: string | null }, formData: FormData) => {
      const result = await createProduct(formData);
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
    let id = String(fd.get("id") ?? "").trim();
    if (!id) {
      id = provisionalId.current;
      fd.set("id", id);
    }
    if (!imagesRef.current) {
      setUploadError("Image uploader is not ready.");
      return;
    }
    setUploading(true);
    try {
      const urls = await imagesRef.current.getFinalUrls(id);
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
      onSubmit={handleSubmit}
      imagesRef={imagesRef}
      error={state.error ?? uploadError}
      pending={pending}
      uploading={uploading}
      submitLabel="Create product"
    />
  );
}
