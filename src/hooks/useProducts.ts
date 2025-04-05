import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setProducts, addProduct, deleteProduct, setSortOption } from '../redux/slices/productSlice';
import { Product, SortOption } from '../types/Product';
import { api } from '../services/api';

export const useProducts = () => {
  const dispatch = useDispatch();
  const { products, sortBy } = useSelector((state: RootState) => state.products);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.fetchProducts();
        dispatch(setProducts(data));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const newProduct = await api.createProduct(product);
      dispatch(addProduct(newProduct));
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await api.deleteProduct(id);
      dispatch(deleteProduct(id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSortChange = (value: SortOption) => {
    dispatch(setSortOption(value));
  };

  const sortedProducts = [...products].sort((a, b) => {
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

  return {
    sortedProducts,
    showAddModal,
    setShowAddModal,
    handleAddProduct,
    handleDeleteProduct,
    handleSortChange,
    sortBy
  };
};
