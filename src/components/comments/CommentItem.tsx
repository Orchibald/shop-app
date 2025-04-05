import React, { useState } from 'react';
import { ProductComment } from '../../types/ProductComment';
import Button from '../common/Button';
import ConfirmationModal from '../common/ConfirmationModal';

interface CommentItemProps {
  comment: ProductComment;
  onDelete: (id: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-date">{comment.date}</span>
        <Button 
          onClick={() => setShowDeleteModal(true)} 
          variant="danger"
        >
          Delete
        </Button>
      </div>
      <p className="comment-text">{comment.description}</p>

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => onDelete(comment.id)}
        title="Delete Comment"
        message="Are you sure you want to delete this comment?"
      />
    </div>
  );
};

export default CommentItem;