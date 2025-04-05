import React, { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import Button from '../common/Button';

interface ProductFormProps {
  product?: Product;
  onSubmit: (product: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
}

const initialProductState: Omit<Product, 'id'> = {
  name: '',
  imageUrl: '',
  count: 0,
  size: {
    width: 0,
    height: 0,
  },
  weight: '',
  comments: [],
};

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSubmit,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'> | Product>(
    product || initialProductState
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    }
    
    if (formData.count <= 0) {
      newErrors.count = 'Count must be greater than 0';
    }
    
    if (formData.size.width <= 0) {
      newErrors.width = 'Width must be greater than 0';
    }
    
    if (formData.size.height <= 0) {
      newErrors.height = 'Height must be greater than 0';
    }
    
    if (!formData.weight.trim()) {
      newErrors.weight = 'Weight is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'width' || name === 'height') {
      setFormData({
        ...formData,
        size: {
          ...formData.size,
          [name]: parseInt(value) || 0,
        },
      });
    } else if (name === 'count') {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Image URL</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          value={formData.imageUrl}
          onChange={handleChange}
          className={errors.imageUrl ? 'input-error' : ''}
        />
        {errors.imageUrl && <span className="error">{errors.imageUrl}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="count">Count</label>
        <input
          id="count"
          name="count"
          type="number"
          value={formData.count}
          onChange={handleChange}
          className={errors.count ? 'input-error' : ''}
        />
        {errors.count && <span className="error">{errors.count}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="width">Width</label>
          <input
            id="width"
            name="width"
            type="number"
            value={formData.size.width}
            onChange={handleChange}
            className={errors.width ? 'input-error' : ''}
          />
          {errors.width && <span className="error">{errors.width}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="height">Height</label>
          <input
            id="height"
            name="height"
            type="number"
            value={formData.size.height}
            onChange={handleChange}
            className={errors.height ? 'input-error' : ''}
          />
          {errors.height && <span className="error">{errors.height}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="weight">Weight</label>
        <input
          id="weight"
          name="weight"
          type="text"
          value={formData.weight}
          onChange={handleChange}
          className={errors.weight ? 'input-error' : ''}
          placeholder="e.g. 200g"
        />
        {errors.weight && <span className="error">{errors.weight}</span>}
      </div>

      <div className="form-actions">
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;