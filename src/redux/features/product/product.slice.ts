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
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.list = action.payload;
    },

    setProduct: (state, action: PayloadAction<IProductGetResponse>) => {
      state.selectedProduct = action.payload;
    },

    updateProduct: (state, action: PayloadAction<IProductGetResponse>) => {
      const updated = action.payload;

      state.selectedProduct = updated;
    },
  },
});

export const { setProducts, setProduct, updateProduct } = products.actions;
export const productReducer = products.reducer;
