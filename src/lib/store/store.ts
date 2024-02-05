import { configureStore } from "@reduxjs/toolkit";
import { appConfig } from "@/data/config";
import { authApi } from "@/services/api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../store/slices/authSlice";
import { apiSlice } from "@/features/api/apiSlice";
import { productsApi } from "@/services/api/prouductApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware, productsApi.middleware]),

  devTools: appConfig.app_env == "Devlopment" ? true : false,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;
setupListeners(store.dispatch);

export default store;
