import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/slices/productSlice';
import { addComment, deleteComment } from '../redux/slices/commentSlice';
import { Product } from '../types/Product';
import { ProductComment } from '../types/ProductComment';
import { api } from '../services/api';

export const useProductDetails = (id: string | undefined) => {
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
        const data = await api.fetchProductById(id);
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

      setProduct({
        ...product,
        comments: [...product.comments, comment],
      });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!product) return;

    try {
      await api.deleteComment(commentId);
      dispatch(deleteComment(commentId));

      setProduct({
        ...product,
        comments: product.comments.filter((c) => c.id !== commentId),
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return {
    product,
    loading,
    showEditModal,
    setShowEditModal,
    handleEditProduct,
    handleAddComment,
    handleDeleteComment,
  };
};
