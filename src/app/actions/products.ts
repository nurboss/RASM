"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { parseImagesField, parseList } from "@/lib/parse";
import { PRODUCT_IMAGES_BUCKET, extractProductImagePathFromPublicUrl } from "@/lib/product-images";
import type { Product } from "@/types/product";

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: String(row.id),
    name: String(row.name),
    price: Number(row.price),
    category: String(row.category),
    description: String(row.description ?? ""),
    sizes: Array.isArray(row.sizes) ? (row.sizes as string[]) : [],
    images: Array.isArray(row.images) ? (row.images as string[]) : [],
    featured: Boolean(row.featured),
  };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return (data ?? []).map((row) => rowToProduct(row as Record<string, unknown>));
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return rowToProduct(data as Record<string, unknown>);
}

export async function createProduct(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "");
  const sizes = parseList(String(formData.get("sizes") ?? ""));
  const images = parseImagesField(formData);
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";

  if (!name || !Number.isFinite(price) || !category) {
    return { error: "Name, price, and category are required." };
  }

  const idRaw = String(formData.get("id") ?? "").trim();
  const id = idRaw || crypto.randomUUID();

  const supabase = await createClient();
  const { error } = await supabase.from("products").insert({
    id,
    name,
    price: Math.round(price),
    category,
    description,
    sizes,
    images,
    featured,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateProduct(id: string, formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const category = String(formData.get("category") ?? "").trim();
  const description = String(formData.get("description") ?? "");
  const sizes = parseList(String(formData.get("sizes") ?? ""));
  const images = parseImagesField(formData);
  const featured = formData.get("featured") === "on" || formData.get("featured") === "true";

  if (!name || !Number.isFinite(price) || !category) {
    return { error: "Name, price, and category are required." };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("products")
    .update({
      name,
      price: Math.round(price),
      category,
      description,
      sizes,
      images,
      featured,
    })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function deleteProduct(id: string, _formData: FormData) {
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("images")
    .eq("id", id)
    .maybeSingle();

  const urls = Array.isArray(product?.images) ? (product!.images as string[]) : [];
  const paths = urls
    .map((u) => extractProductImagePathFromPublicUrl(String(u)))
    .filter((p): p is string => Boolean(p));
  if (paths.length) {
    await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove(paths);
  }

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) {
    console.error(error);
    return;
  }

  revalidatePath("/dashboard");
}
