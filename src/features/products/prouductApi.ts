import { appConfig } from "@/config/appConfig";
import { RootState } from "@/lib/store/store";
import { IProduct } from "@/types/Product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetProductByIdResponse {
  payload: IProduct;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
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
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProduct: builder.query<IProduct[], void>({
      query: () => "/products",
      providesTags: [{ type: "products", id: "LIST" }],
    }),

    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (id) => `/products/${id}`,
    }),

    addProduct: builder.mutation<void, IProduct>({
      query: (request) => ({
        url: `/products`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: request,
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),

    updateProduct: builder.mutation<void, IProduct>({
      query: (request) => ({
        url: `/products`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: request,
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "products", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
