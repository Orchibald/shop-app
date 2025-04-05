import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductComment } from '../../types/ProductComment';

interface CommentState {
  comments: ProductComment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

export const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<ProductComment>) => {
      state.comments.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<number>) => {
      state.comments = state.comments.filter(c => c.id !== action.payload);
    },
  },
});

export const { addComment, deleteComment } = commentSlice.actions;

export default commentSlice.reducer;