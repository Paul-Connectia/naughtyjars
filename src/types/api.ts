
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
