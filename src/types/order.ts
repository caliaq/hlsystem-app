import { Product } from "./product";
import { Visitor } from "./visitor";

export interface OrderItem {
  product: Product | string;
  quantity: number;
  duration?: number;
}

export interface Order {
  _id: string;
  items?: OrderItem[];
  totalPrice?: number;
  visitor?: Visitor | string;
  createdAt: string;
  completedAt?: string;
}

export interface OrderProduct {
  _id?: string;
  product: Product;
  quantity: number;
  duration?: number;
}

export interface OrderFilterParams {
  startDate: string;
  endDate: string;
}