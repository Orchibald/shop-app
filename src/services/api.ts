import { Product } from "../types/Product";
import { ProductComment } from "../types/ProductComment";


const API_URL = 'http://localhost:3001';

export const api = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  async fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${id}`);
    return response.json();
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  async updateProduct(product: Product): Promise<Product> {
    const response = await fetch(`${API_URL}/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  async deleteProduct(id: number): Promise<void> {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
  },

  async addComment(comment: Omit<ProductComment, 'id'>): Promise<ProductComment> {
    const response = await fetch(`${API_URL}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
    return response.json();
  },

  async deleteComment(id: number): Promise<void> {
    await fetch(`${API_URL}/comments/${id}`, {
      method: 'DELETE',
    });
  },
};