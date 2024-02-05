import { appConfig } from "@/config/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.baseUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({}),
});
