export type DateFilter = 'day' | 'month' | 'year';

export interface ProductMetric {
  _id: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface MetricItem {
  label: string; // Date or period label
  totalRevenue: number;
  products: Record<string, ProductMetric>;
}
