import { appConfig } from "@/config/appConfig";
import { RootState } from "@/lib/store/store";
import { IProduct } from "@/types/Product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetAllProductResponse {
  payload: IProduct[];
}

interface GetProductByIdResponse {
  payload: IProduct;
}

interface AddNewProductRequest {
  name: string;
  price: number;
}

interface UpdateProductRequest {
  id: string;
  name?: string;
  price?: number;
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
  endpoints: (builder) => ({
    getAllProduct: builder.query<GetAllProductResponse, void>({
      query: () => "/products",
    }),

    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (id) => `/products/${id}`,
    }),

    addNewProduct: builder.mutation<IProduct, Partial<AddNewProductRequest>>({
      query: (request) => ({
        url: `/products`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: request,
      }),
    }),

    updateProduct: builder.mutation<IProduct, UpdateProductRequest>({
      query: ({ id, request }: any) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: request,
      }),
    }),

    deleteProduct: builder.mutation<void, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useAddNewProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
