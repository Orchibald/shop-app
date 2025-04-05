import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ProductForm from '../components/products/ProductForm';
import CommentList from '../components/comments/CommentList';
import CommentForm from '../components/comments/CommentForm';
import { useProductDetails } from '../hooks/useProductDetails';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    product,
    loading,
    showEditModal,
    setShowEditModal,
    handleEditProduct,
    handleAddComment,
    handleDeleteComment,
  } = useProductDetails(id);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-details-page">
      <div className="product-details-header">
        <Button onClick={() => navigate('/')} variant="secondary">
          Back to Products
        </Button>
        <h1>{product.name}</h1>
        <Button onClick={() => setShowEditModal(true)}>Edit Product</Button>
      </div>

      <div className="product-details">
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        <div className="product-info-container">
          <div className="product-info-item">
            <span className="label">Name:</span>
            <span className="value">{product.name}</span>
          </div>
          <div className="product-info-item">
            <span className="label">Count:</span>
            <span className="value">{product.count}</span>
          </div>
          <div className="product-info-item">
            <span className="label">Size:</span>
            <span className="value">{product.size.width}x{product.size.height}</span>
          </div>
          <div className="product-info-item">
            <span className="label">Weight:</span>
            <span className="value">{product.weight}</span>
          </div>
        </div>
      </div>

      <div className="product-comments-section">
        <h2>Comments</h2>
        <CommentForm productId={product.id} onSubmit={handleAddComment} />
        <CommentList comments={product.comments} onDelete={handleDeleteComment} />
      </div>

      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Product">
        <ProductForm product={product} onSubmit={handleEditProduct} onCancel={() => setShowEditModal(false)} />
      </Modal>
    </div>
  );
};

export default ProductDetailsPage;
