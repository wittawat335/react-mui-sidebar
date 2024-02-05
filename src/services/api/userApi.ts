import { IUser } from "@/types/User";
import axiosInstance from "./axiosInstance";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";

export async function getList() {
  const response = await axiosInstance.get<IUser[]>("/user");
  return response.data.value;
}

export async function get(id: string) {
  return await axiosInstance.get(`/user/${id}`);
}

export async function add(request: IUser) {
  return await axiosInstance.post("/user", request);
}

export async function update(request: IUser) {
  return await axiosInstance.patch(`/user/${request.id}`, request);
}

export async function deleteUser(id: string) {
  return await axiosInstance.delete(`/user/${id}`);
}

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["users"],
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.baseApiUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("states: ", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/Authenticate/login",
          method: "post",
          body,
        };
      },
    }),
    register: builder.mutation({
      query: (body: IRegister) => {
        return {
          url: "/Authenticate/register",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
