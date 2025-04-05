import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/slices/productSlice';
import { addComment, deleteComment } from '../redux/slices/commentSlice';
import { Product } from '../types/Product';
import { ProductComment } from '../types/ProductComment';
import { api } from '../services/api';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import ProductForm from '../components/products/ProductForm';
import CommentList from '../components/comments/CommentList';
import CommentForm from '../components/comments/CommentForm';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await api.fetchProductById(parseInt(id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleEditProduct = async (updatedProduct: Product) => {
    try {
      const result = await api.updateProduct(updatedProduct);
      setProduct(result);
      dispatch(updateProduct(result));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleAddComment = async (description: string) => {
    if (!product) return;

    const newComment: Omit<ProductComment, 'id'> = {
      productId: product.id,
      description,
      date: new Date().toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    };

    try {
      const comment = await api.addComment(newComment);
      dispatch(addComment(comment));

      // Update local product state with new comment
      setProduct({
        ...product,
        comments: [...product.comments, comment],
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!product) return;

    try {
      await api.deleteComment(commentId);
      dispatch(deleteComment(commentId));

      // Update local product state without the deleted comment
      setProduct({
        ...product,
        comments: product.comments.filter((c) => c.id !== commentId),
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

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
        <Button onClick={() => setShowEditModal(true)}>
          Edit Product
        </Button>
      </div>

      <div className="product-details">
        <div className="product-image-container">
          <img src={product.imageUrl} alt={product.name} /><img src={product.imageUrl} alt={product.name} />
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

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Product"
      >
        <ProductForm
          product={product}
          onSubmit={handleEditProduct}
          onCancel={() => setShowEditModal(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductDetailsPage;