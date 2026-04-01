import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface ICartItem {
  productId: string;
  quantity: number;
}

interface ICartState {
  items: ICartItem[];
}

const initialState: ICartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartItemAdded: (state, action: PayloadAction<{ productId: string }>) => {
      const existingCartItem = state.items.find(
        (state) => state.productId === action.payload.productId,
      );
      if (existingCartItem) {
        existingCartItem.quantity += 1;
      } else {
        state.items.push({
          productId: action.payload.productId,
          quantity: 1,
        });
      }
    },
    cartItemRemoved: (state, action: PayloadAction<{ productId: string }>) => {
      state.items = state.items.filter(
        (state) => state.productId !== action.payload.productId,
      );
    },
    cartItemQuantityUpdated: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) => {
      const existingItem = state.items.find(
        (state) => state.productId === action.payload.productId,
      );
      if (existingItem) {
        existingItem.quantity = action.payload.quantity;
      }
    },
    cartCleared: (state) => {
      state.items = [];
    },
    cartItemsReceived: (state, action: PayloadAction<ICartItem[]>) => {
      state.items = action.payload;
    },
  },
});

export const {
  cartItemAdded,
  cartItemRemoved,
  cartItemQuantityUpdated,
  cartCleared,
  cartItemsReceived,
} = cartSlice.actions;
const CartReducer = cartSlice.reducer;
export default CartReducer;
