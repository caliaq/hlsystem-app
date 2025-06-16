import { Product } from "../services/productService";
import { Visitor } from "../services/visitorService";

export interface OrderItem {
  product: Product | string;
  quantity: number;
  duration?: number;
}

export interface Order {
  _id: string;
  items?: OrderItem[];
  totalPrice?: number;
  visitor?: any;
  createdAt: string;
  completedAt?: string;
}

export interface OrderProduct {
  id?: string;
  product: Product;
  quantity: number;
  duration?: number;
}

export interface OrderFilterParams {
  startDate: string;
  endDate: string;
}