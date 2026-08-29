// src/lib/localProducts.js
import products from "@/data/products";

export const Product = {
  list: (sort = "-created_date", limit = 50) => {
    const ordered = [...products].reverse(); // newest-added shows first, matching Base44's default sort
    return Promise.resolve(ordered.slice(0, limit));
  },
  get: (id) => {
    const found = products.find((p) => p.id === id);
    return found ? Promise.resolve(found) : Promise.reject(new Error("Product not found"));
  },
};