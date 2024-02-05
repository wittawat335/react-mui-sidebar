import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/data/config";
import { IRegister } from "@/types/Register";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.baseApiUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/Authenticate/login",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body,
        };
      },
    }),
    register: builder.mutation({
      query: (body: IRegister) => {
        return {
          url: "/Authenticate/register",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
