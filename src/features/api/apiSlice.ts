import { appConfig } from "@/data/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // optional
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.baseApiUrl }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({}),
});
