import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "../../config";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.baseApiUrl,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { username: string; password: string }) => {
        return {
          url: "Authen/Login",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
