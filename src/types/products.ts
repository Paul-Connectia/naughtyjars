export type product = {
  _id: string;       // MongoDB ID
  name: string;
  slug?: string;     // optional if your backend has slug
  price: number;
  images: string[];
  weight: string;
  description?: string;
  reviews?: number;
  type: string;      // For filtering in ProductsPage
};