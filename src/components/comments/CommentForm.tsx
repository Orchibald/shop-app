import React, { useState } from 'react';
import Button from '../common/Button';

interface CommentFormProps {
  productId: string;
  onSubmit: (description: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    
    onSubmit(description);
    setDescription('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <label htmlFor="description">Add a comment</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={error ? 'input-error' : ''}
          rows={3}
        />
        {error && <span className="error">{error}</span>}
      </div>
      <Button type="submit">
        Add Comment
      </Button>
    </form>
  );
};

export default CommentForm;