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
    addProduct: (state, action: PayloadAction<TProduct>) => {
      state.list.push(action.payload);
    },

    setProducts: (state, action: PayloadAction<TProductsList[]>) => {
      state.list = action.payload;
    },

    setProduct: (state, action: PayloadAction<TProduct>) => {
      state.selectedProduct = action.payload;
    },

    updateProduct: (state, action: PayloadAction<TProduct>) => {
      const updated = action.payload;
      state.list = state.list.map((p) => (p.id === updated.id ? updated : p));
    },
  },
});

export const { setProducts, setProduct, updateProduct, addProduct } =
  products.actions;
export const productReducer = products.reducer;
