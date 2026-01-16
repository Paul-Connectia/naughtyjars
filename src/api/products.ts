import axios from "axios";
import type { product } from "@/types/products";

const API_URL = import.meta.env.VITE_API_URL;

export const getProductsByType = async (type: string): Promise<product[]> => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    const products: product[] = res.data;

    // Filter by type
    return products.filter((p) => p.type === type);
  } catch (err) {
    console.error("Failed to fetch products", err);
    return [];
  }
};

export const getProductById = async (id: string): Promise<product | null> => {
  try {
    const res = await axios.get(`${API_URL}/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
  }
};
