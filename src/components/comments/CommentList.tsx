import React from 'react';
import { ProductComment } from '../../types/ProductComment';
import CommentItem from './CommentItem';

interface CommentListProps {
  comments: ProductComment[];
  onDelete: (id: string) => void;
}

const CommentList: React.FC<CommentListProps> = ({ comments, onDelete }) => {
  if (comments.length === 0) {
    return <p className="no-comments">No comments yet.</p>;
  }

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem 
          key={comment.id} 
          comment={comment} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default CommentList;