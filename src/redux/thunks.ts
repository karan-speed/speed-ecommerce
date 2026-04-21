import { createAsyncThunk } from "@reduxjs/toolkit";
import { CallAPIInterface } from "../components/constants";
import type {
  TCategoryForm,
  TCategoryList,
  TLoginForm,
  TProduct,
  TRegisterForm,
  TUserLogin,
  TUserRegister,
} from "../types";
import {
  logout,
  setAccessToken,
  setCredentials,
} from "./persisted/auth/auth.slice";
import { hideLoader, showLoader } from "./loader/loader.slice";
import { setCategories } from "./category/category.slice";
import { updateProduct } from "./product/product.slice";
import axios from "axios";
import { history } from "../utils/history";
import { logOutLoadingText } from "../components/messages";
export const logIn = createAsyncThunk(
  "auth/logIn",
  async (values: TLoginForm, { dispatch, rejectWithValue }) => {
    dispatch(showLoader({}));
    try {
      const response = await CallAPIInterface<TUserLogin>({
        method: "POST",
        url: "/login",
        data: values,
        isPrivate: false,
      });
      dispatch(
        setCredentials({
          user: response.user,
          access_token: response.access_token,
        }),
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoader());
    }
  },
);
export const signUp = createAsyncThunk(
  "auth/register",
  async (values: TRegisterForm, { dispatch, rejectWithValue }) => {
    dispatch(showLoader({}));
    try {
      const response = await CallAPIInterface<TUserRegister>({
        method: "POST",
        url: "/register",
        data: values,
        isPrivate: false,
      });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoader());
      history.push("/login");
    }
  },
);
export const generateToken = createAsyncThunk(
  "auth/generateToken",
  async (_, { dispatch, rejectWithValue }) => {
    return await axios<{ access_token: string }>({
      baseURL: import.meta.env.VITE_API_BASE_URL as string,
      method: "POST",
      url: "/generate-token",
      withCredentials: true,
    })
      .then(async (response) => {
        dispatch(setAccessToken(response.data.access_token!));
        return response.data;
      })
      .catch((error) => {
        return rejectWithValue(error);
      });
  },
);
export const logOut = createAsyncThunk(
  "auth/logOut",
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(showLoader({ text: logOutLoadingText }));
    try {
      await CallAPIInterface({
        method: "POST",
        url: "/logout",
        isPrivate: true,
      });
      dispatch(logout());
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoader());
    }
  },
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (values: TCategoryForm, { dispatch, rejectWithValue }) => {
    dispatch(showLoader({}));
    try {
      const response = await CallAPIInterface({
        method: "POST",
        url: "/categories",
        data: values,
        isPrivate: true,
      });
      await CallAPIInterface({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });

      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(hideLoader());
    }
  },
);

export const getCategories = createAsyncThunk(
  "category/get",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await CallAPIInterface<TCategoryList[]>({
        method: "GET",
        url: "/categories",
        isPrivate: true,
      });
      dispatch(setCategories(response));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
    }
  },
);

export const toggleArchiveProduct = createAsyncThunk(
  "products/archive",
  async (data: TProduct, { dispatch, rejectWithValue }) => {
    try {
      const response = await CallAPIInterface<TProduct>({
        method: "PUT",
        url: `/products/visiblity/${data?.id}`,
        data: {
          visiblity: !data?.visiblity,
        },
        isPrivate: true,
      });
      if (data?.spotlight) {
        dispatch(toggleSpotlightProduct(data));
      }
      dispatch(updateProduct(response));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    } finally {
    }
  },
);
export const toggleSpotlightProduct = createAsyncThunk(
  "products/spotlight",
  async (data: TProduct, { dispatch, rejectWithValue }) => {
    try {
      const response = await CallAPIInterface<TProduct>({
        method: "PUT",
        url: `/products/spotlight/${data?.id}`,
        data: {
          status: !data?.spotlight,
        },
        isPrivate: true,
      });
      dispatch(updateProduct(response));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (data: TProduct, { dispatch, rejectWithValue }) => {
    try {
      const response = await CallAPIInterface<TProduct>({
        method: "DELETE",
        url: `/products/delete/${data.id}`,
        isPrivate: true,
      });
      dispatch(deleteProduct(response));
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
