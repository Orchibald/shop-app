import { ProductComment } from "./ProductComment";

export interface Size {
  width: number;
  height: number;
}

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  count: number;
  size: Size;
  weight: string;
  comments: ProductComment[];
}

export type SortOption = 'name' | 'count';