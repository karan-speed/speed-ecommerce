import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./features/persisted/auth/auth.slice";
import CartReducer from "./features/persisted/cart/cart.slice";
import AddressReducer from "./features/persisted/adress/address.slice";
import CategoryReducer from "./features/category/category.slice";
import { ToastReducer } from "./features/error/error.slice";
import { LoaderReducer } from "./features/loader/loader.slice";
import { productReducer } from "./features/product/product.slice";

const rootReducer = combineReducers({
  auth: AuthReducer,
  cart: CartReducer,
  address: AddressReducer,
  category: CategoryReducer,
  toast: ToastReducer,
  loader: LoaderReducer,
  product: productReducer,
});
export default rootReducer;
