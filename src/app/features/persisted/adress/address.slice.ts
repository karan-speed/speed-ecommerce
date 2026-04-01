import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserAdressResponse } from "../../../../types";

// interface
// initial state
// slice

interface IAddressState {
  address: UserAdressResponse[];
}

const initialState: IAddressState = {
  address: [],
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setUserAddress: (state, action: PayloadAction<UserAdressResponse[]>) => {
      state.address = action.payload;
    },
    deleteUserAddress: (state, action: PayloadAction<UserAdressResponse>) => {
      state.address = state.address.filter(
        (state) => state.id !== action.payload.id,
      );
    },
    updateExistingAddress: (
      state,
      action: PayloadAction<UserAdressResponse>,
    ) => {
      const index = state.address.findIndex(
        (add) => add.id === action.payload.id,
      );
      if (index !== -1) {
        state.address[index] = action.payload;
      }
    },
  },
});
export const { setUserAddress, deleteUserAddress, updateExistingAddress } =
  addressSlice.actions;
const AddressReducer = addressSlice.reducer;
export default AddressReducer;
