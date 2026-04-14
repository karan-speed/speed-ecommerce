import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProductGetResponse, Products } from "../../../types";

interface ProductState {
  list: Products[];
  selectedProduct: IProductGetResponse | null;
}

const initialState: ProductState = {
  list: [],
  selectedProduct: null,
};

const products = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProductGetResponse>) => {
      state.list.push(action.payload);
    },

    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.list = action.payload;
    },

    setProduct: (state, action: PayloadAction<IProductGetResponse>) => {
      state.selectedProduct = action.payload;
    },

    updateProduct: (state, action: PayloadAction<IProductGetResponse>) => {
      const updated = action.payload;
      state.list = state.list.map((p) => (p.id === updated.id ? updated : p));
    },
  },
});

export const { setProducts, setProduct, updateProduct, addProduct } =
  products.actions;
export const productReducer = products.reducer;
