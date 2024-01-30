import { IAuth } from "@/types/Auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  auth: IAuth | null;
  isLogin: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  auth: null,
  isLogin: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IAuth>) => {
      state.auth = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    isLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    isAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    logout: (state) => {
      state.auth = null;
      state.isLogin = false;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { logout, setAuth, isAuthenticated, isLogin } = authSlice.actions;

export default authSlice.reducer;
