import { Product } from "../types/Product";
import { ProductComment } from "../types/ProductComment";

const API_URL = 'http://localhost:3001';

export const api = {
  async fetchProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}/products`);
    return response.json();
  },

  async fetchProductById(id: string): Promise<Product> {
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

  async deleteProduct(id: string): Promise<void> {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
  },

  async addComment(comment: Omit<ProductComment, 'id'>): Promise<ProductComment> {
    try {
      const productsResponse = await fetch(`${API_URL}/products`);
      const products = await productsResponse.json();

      const product = products.find((p: Product) => p.id === comment.productId);

      if (!product) {
        throw new Error('Product not found');
      }

      const newComment = {
        ...comment,
        id: Math.random().toString(36).substr(2, 9),
      };

      product.comments.unshift(newComment);

      const updateResponse = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update product');
      }

      return newComment;
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  },

  async deleteComment(id: string): Promise<void> {
    try {
      const productsResponse = await fetch(`${API_URL}/products`);
      const products = await productsResponse.json();

      const product = products.find((p: Product) => p.comments.some((c) => c.id === id));

      if (!product) {
        throw new Error('Product not found');
      }

      product.comments = product.comments.filter((comment: ProductComment) => comment.id !== id);

      const updateResponse = await fetch(`${API_URL}/products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!updateResponse.ok) {
        throw new Error('Failed to update product');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  },
};
