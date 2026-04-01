import { createSlice } from "@reduxjs/toolkit";
interface IloaderPayload {
  open: boolean;
  text?: string;
  customClass?: string;
}

const initialState: IloaderPayload = {
  open: false,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.open = true;
    },
    hideLoader: (state) => {
      state.open = false;
    },
  },
});
export const LoaderReducer = loaderSlice.reducer;
export const { hideLoader, showLoader } = loaderSlice.actions;
