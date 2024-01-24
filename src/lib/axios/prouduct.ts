import { Product } from "@/types/Product";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { appConfig } from "config";

interface IProductApi {
  getList: () => Promise<Product[]>;
  getProduct: (id: string) => Promise<AxiosResponse>;
  addProduct: (product: Product) => Promise<AxiosResponse>;
  updateProduct: (product: Product) => Promise<AxiosResponse>;
  deleteProduct: (id: number) => Promise<AxiosResponse>;
}

const baseApi: AxiosInstance = axios.create({
  baseURL: appConfig.url,
});

export const getList = async (): Promise<Product[]> => {
  const response: AxiosResponse = await baseApi.get("/product");
  return response.data;
};

export const getProduct = async (id: string): Promise<AxiosResponse> => {
  return await baseApi.get(`/product/${id}`);
};

export const addProduct = async (product: Product): Promise<AxiosResponse> => {
  return await baseApi.post("/product", product);
};

export const updateProduct = async (
  product: Product
): Promise<AxiosResponse> => {
  return await baseApi.patch(`/product/${product.id}`, product);
};

export const deleteProduct = async (id: number): Promise<AxiosResponse> => {
  return await baseApi.delete(`/product/${id}`);
};

const productApiInstance: IProductApi = {
  getList,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default productApiInstance;
