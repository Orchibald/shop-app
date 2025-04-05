import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { 
  setProducts, 
  addProduct, 
  deleteProduct, 
  setSortOption 
} from '../redux/slices/productSlice';
import { Product, SortOption } from '../types/Product';
import { api } from '../services/api';
import ProductCard from '../components/products/ProductCard';
import SortDropdown from '../components/products/SortDropdown';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ProductForm from '../components/products/ProductForm';

const ProductsPage: React.FC = () => {
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

  // Sort products by name first, then by count
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'name') {
      // Primary sort by name
      const nameComparison = a.name.localeCompare(b.name);
      if (nameComparison !== 0) return nameComparison;
      
      // Secondary sort by count
      return a.count - b.count;
    } else {
      // Primary sort by count
      const countComparison = a.count - b.count;
      if (countComparison !== 0) return countComparison;
      
      // Secondary sort by name
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        <div className="products-controls">
          <SortDropdown value={sortBy} onChange={handleSortChange} />
          <Button onClick={() => setShowAddModal(true)}>
            Add Product
          </Button>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found. Add a new product to get started.</p>
        </div>
      )}

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
      >
        <ProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductsPage;