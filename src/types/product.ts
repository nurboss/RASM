export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  sizes: string[];
  images: string[];
  featured: boolean;
};

export const PRODUCT_CATEGORIES = ["premium", "casual", "festive"] as const;
export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
