import React from 'react';
import ProductCard from '../components/products/ProductCard';
import SortDropdown from '../components/products/SortDropdown';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ProductForm from '../components/products/ProductForm';
import { useProducts } from '../hooks/useProducts';

const ProductsPage: React.FC = () => {
  const {
    sortedProducts,
    showAddModal,
    setShowAddModal,
    handleAddProduct,
    handleDeleteProduct,
    handleSortChange,
    sortBy
  } = useProducts();

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Products</h1>
        <div className="products-controls">
          <SortDropdown onChange={handleSortChange} value={sortBy} />
          <Button onClick={() => setShowAddModal(true)}>Add Product</Button>
        </div>
      </div>

      <div className="products-grid">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} onDelete={handleDeleteProduct} />
        ))}
      </div>

      {sortedProducts.length === 0 && (
        <div className="no-products">
          <p>No products found. Add a new product to get started.</p>
        </div>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Product">
        <ProductForm onSubmit={handleAddProduct} onCancel={() => setShowAddModal(false)} />
      </Modal>
    </div>
  );
};

export default ProductsPage;
