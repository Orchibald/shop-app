import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import Button from '../common/Button';
import ConfirmationModal from '../common/ConfirmationModal';

interface ProductCardProps {
  product: Product;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p>Count: {product.count}</p>
          <p>Size: {product.size.width}x{product.size.height}</p>
          <p>Weight: {product.weight}</p>
        </div>
      </Link>
      <div className="product-actions">
        <Button 
          onClick={() => setShowDeleteModal(true)} 
          variant="danger"
        >
          Delete
        </Button>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDelete(product.id)}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"?`}
      />
    </div>
  );
};

export default ProductCard;