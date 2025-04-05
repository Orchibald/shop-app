import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, SortOption } from '../../types/Product';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  sortBy: SortOption;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  sortBy: 'name',
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setSortOption: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
  },
});

export const { 
  setProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct,
  setSortOption
} = productSlice.actions;

export default productSlice.reducer;