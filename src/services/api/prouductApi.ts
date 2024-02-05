import { appConfig } from "@/config/appConfig";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Product {
  id: string;
  name: string;
  price: number;
}

interface GetAllProductResponse {
  products: Product[];
}

interface GetProductByIdResponse {
  product: Product;
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
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: appConfig.baseApiUrl }),
  endpoints: (builder) => ({
    getAllProduct: builder.query<GetAllProductResponse, void>({
      query: () => "/products",
    }),

    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (id) => `/products/${id}`,
    }),

    addNewProduct: builder.mutation<Product, Partial<AddNewProductRequest>>({
      query: (newProduct) => ({
        url: `/products/add`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newProduct,
      }),
    }),

    updateProduct: builder.mutation<Product, UpdateProductRequest>({
      query: ({ id, updatedProduct }: any) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedProduct,
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
