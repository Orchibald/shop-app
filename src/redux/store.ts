import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import commentReducer from './slices/commentSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    comments: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;