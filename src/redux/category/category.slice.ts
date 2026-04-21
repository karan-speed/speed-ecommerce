import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TCategoryList, TCategoryDetails } from "../../types";

interface ICategoryState {
  categories: TCategoryList[];
  categoryDetails: TCategoryDetails;
}

const initialState: ICategoryState = {
  categories: [],
  categoryDetails: {
    id: "",
    name: "",
    total_products: 0,
    total_stock: 0,
    average_price: 0,
    active_products: 0,
    spotlighted_products: 0,
    products: [],
  },
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<TCategoryList[]>) => {
      state.categories = action.payload;
    },
    setCategoryDetails: (state, action: PayloadAction<TCategoryDetails>) => {
      state.categoryDetails = action.payload;
    },

    categoryAdded: (state, action: PayloadAction<TCategoryList>) => {
      state.categories.push(action.payload);
    },
    categoryUpdated: (state, action: PayloadAction<TCategoryList>) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id,
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    categoryRemoved: (state, action: PayloadAction<{ id: string }>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload.id,
      );
    },
  },
});
export const {
  setCategories,
  categoryAdded,
  setCategoryDetails,
  categoryUpdated,
  categoryRemoved,
} = category.actions;
const CategoryReducer = category.reducer;
export default CategoryReducer;
