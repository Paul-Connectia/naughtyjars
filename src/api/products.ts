import axiosInstance from "@/lib/axiosInstance";
import type { product } from "@/types/products";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllProducts = async (): Promise<product[]> => {
  try {
    const res = await axiosInstance.get(`${API_URL}/products`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch products", err);
    return [];
  }
}
// Update the addProduct function in products.ts:
export const addProduct = async (productData: Omit<product, "_id" | "__v" | "createdAt" | "updatedAt">): Promise<product | null> => {
  try {
    const res = await axiosInstance.post(`${API_URL}/products`, productData);
    return res.data;
  } catch (err) {
    console.error("Failed to add product", err);
    return null;
  }
}
export const updateProduct = async (id: string, data: Partial<product>): Promise<product | null> => {
  try {
    const res = await axiosInstance.put(`${API_URL}/products/${id}`, data);
    return res.data;
  } catch (err) {
    console.error("Failed to update product", err);
    return null;
  }
}
export const deleteProduct = async (id: string): Promise<boolean> => {
  try {
    await axiosInstance.delete(`${API_URL}/products/${id}`);
    return true;
  } catch (err) {
    console.error("Failed to delete product", err);
    return false;
  }
}

// export const getProductsByType = async (type: string): Promise<product[]> => {
//   try {
//     const res = await axiosInstance.get(`${API_URL}/products`);
//     const products: product[] = res.data;

//     // Filter by type
//     return products.filter((p) => p.type === type);
//   } catch (err) {
//     console.error("Failed to fetch products", err);
//     return [];
//   }
// };

export const getProductById = async (id: string): Promise<product | null> => {
  try {
    const res = await axiosInstance.get(`${API_URL}/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Failed to fetch product:", err);
    return null;
  }
};
