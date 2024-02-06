import { IUser } from "@/types/User";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { appConfig } from "@/config/appConfig";
import { RootState } from "@/lib/store/store";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["users"],
  baseQuery: fetchBaseQuery({
    baseUrl: appConfig.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/users",
      providesTags: [{ type: "users", id: "userLIST" }],
    }),

    getUser: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
      providesTags: [{ type: "users", id: "userLIST" }],
    }),

    addUser: builder.mutation<void, Partial<IUser>>({
      query: (request) => ({
        url: `/users`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: request,
      }),
      invalidatesTags: [{ type: "users", id: "userLIST" }],
    }),

    updateUser: builder.mutation<void, IUser>({
      query: (request) => ({
        url: `/users`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: request,
      }),
      invalidatesTags: [{ type: "users", id: "userLIST" }],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "users", id: "userLIST" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
