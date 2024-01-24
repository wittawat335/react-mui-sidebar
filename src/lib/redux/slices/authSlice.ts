import { IUser } from "@/types/User";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

type AuthState = {
  auth: IUser | null;
};

const initialState: AuthState = {
  auth: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.auth = action.payload;
      localStorage.setItem("auth", JSON.stringify(action.payload));
    },
    signout: (state) => {
      state.auth = null;
      localStorage.clear();
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { signout, setUser } = authSlice.actions;

export default authSlice.reducer;
