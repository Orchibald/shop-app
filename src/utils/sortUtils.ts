import { Product, SortOption } from '../types/Product';

export const sortProducts = (products: Product[], sortBy: SortOption): Product[] => {
  return [...products].sort((a, b) => {
    if (sortBy === 'name') {
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) return nameComparison;
      
      return a.count - b.count;
    } else {
      const countComparison = a.count - b.count;
      if (countComparison !== 0) return countComparison;
      
      return a.name.localeCompare(b.name);
    }
  });
};