import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "./persisted/auth/auth.slice";
import CartReducer from "./persisted/cart/cart.slice";
import AddressReducer from "./persisted/adress/address.slice";
import CategoryReducer from "./category/category.slice";
import { ToastReducer } from "./error/error.slice";
import { LoaderReducer } from "./loader/loader.slice";
import { productReducer } from "./product/product.slice";

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
