import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import { appConfig } from "@/data/config";

const store = configureStore({
  reducer: {
    auth_reducer: authReducer,
    user_reducer: userReducer,
  },
  devTools: appConfig.app_env == "Devlopment" ? true : false,
});

type RootState = ReturnType<typeof store.getState>;
type AppDispath = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispath>();

export default store;
