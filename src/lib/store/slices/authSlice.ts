import { IAuth } from "@/types/Auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: IAuth | null;
  isLogin: boolean;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  isLogin: false,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      state.user = action.payload;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    isLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    isAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    signout: (state) => {
      state.user = null;
      state.isLogin = false;
      state.isAuthenticated = false;
      localStorage.clear();
    },
  },
});

export const { signout, setUser, isAuthenticated, isLogin } = authSlice.actions;

export default authSlice.reducer;
