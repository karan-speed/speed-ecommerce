import type { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";
import type { ICategory } from "./category.slice";
export const selectCategories = (state: RootState) => state.category.categories;

export const selectFilteredCategories = createSelector(
  [selectCategories, (_: RootState, search: string) => search],
  (categories, search) => {
    return categories.filter((category: ICategory) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  },
);
