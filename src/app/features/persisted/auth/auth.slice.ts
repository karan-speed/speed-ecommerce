import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserLoginResponseData } from "../../../../types";

interface IAuthState {
  user: UserLoginResponseData["user"] | null;
  access_token: string | null;
}

const initialState: IAuthState = {
  user: null,
  access_token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserLoginResponseData>) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
    setJwtToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.access_token = null;
    },
  },
});

export const { setCredentials, logout, setJwtToken } = authSlice.actions;
const AuthReducer = authSlice.reducer;
export default AuthReducer;
