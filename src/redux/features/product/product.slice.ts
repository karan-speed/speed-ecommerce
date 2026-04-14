import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TProduct, TProductsList } from "../../../types";

interface ProductState {
  list: TProductsList[];
  selectedProduct: TProduct | null;
}

const initialState: ProductState = {
  list: [],
  selectedProduct: null,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<TProductsList[]>) => {
      state.list = action.payload;
    },
    setProduct: (state, action: PayloadAction<TProduct>) => {
      state.selectedProduct = action.payload;
    },
    addProduct: (state, action: PayloadAction<TProduct>) => {
      state.list.push(action.payload);
    },

    updateProduct: (state, action: PayloadAction<TProduct>) => {
      const updated = action.payload;
      state.list = state.list.map((p) => (p.id === updated.id ? updated : p));

      if (state.selectedProduct?.id === updated.id) {
        state.selectedProduct = updated;
      }
    },
    deleteProduct: (state, action: PayloadAction<{ id: string }>) => {
      const id = action.payload.id;
      state.list.filter((product) => product.id !== id);
      if (state?.selectedProduct?.id === id) {
        state.selectedProduct = null;
      }
    },
  },
});

export const {
  setProducts,
  setProduct,
  updateProduct,
  addProduct,
  deleteProduct,
} = products.actions;
export const productReducer = products.reducer;
