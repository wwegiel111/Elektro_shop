export enum UserRole {
  GUEST = 'guest',
  CLIENT = 'client',
  ADMIN = 'admin'
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: UserRole;
}

export interface Order {
  id: string;
  userId: number | null; // null if guest
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
  customerEmail?: string;
}

export type ViewState = 'store' | 'cart' | 'admin' | 'profile' | 'checkout-success';