import { Product } from "../services/productService";
import { Visitor } from "../services/visitorService";

export interface OrderProduct {
    product: Product;
    quantity: number;
    duration?: number; // Optional duration field
    id?: string; // For frontend tracking only
}

export interface Order {
    _id: string;
    items: OrderProduct[];
    totalPrice: number;
    visitor?: Visitor;
    createdAt: Date;
    completedAt?: Date;
}