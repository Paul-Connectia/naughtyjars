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

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  slug?: string;     // optional if your backend has slug
  weight: string;
  description: string;
  reviews: number;
  type: string;
  createdAt: string;
}

export interface Blog {
  id: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  date: string;
  createdAt: string;
}

export type UserRole = 'admin' | 'crew';

export interface User {
  id: string;
  username: string;
  role: UserRole;
}
