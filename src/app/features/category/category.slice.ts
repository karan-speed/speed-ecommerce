import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductResponse } from "../../../types";

export interface ICategory {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

interface ICategoryState {
  categories: ICategory[];
}

const initialState: ICategoryState = {
  categories: [],
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.categories = action.payload;
    },
    categoryAdded: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload);
    },
    categoryUpdated: (state, action: PayloadAction<ICategory>) => {
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
  categoryUpdated,
  categoryRemoved,
} = category.actions;
const CategoryReducer = category.reducer;
export default CategoryReducer;
