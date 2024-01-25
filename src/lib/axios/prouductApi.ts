import { IProduct } from "@/types/Product";
import { AxiosResponse } from "axios";
import axiosInstance from "./axiosInstance";

export async function getList() {
  return await axiosInstance.get("/Products");
}

export const getProduct = async (id: string): Promise<AxiosResponse> => {
  return await axiosInstance.get(`/product/${id}`);
};

export const addProduct = async (product: IProduct): Promise<AxiosResponse> => {
  return await axiosInstance.post("/product", product);
};

export const updateProduct = async (
  product: IProduct
): Promise<AxiosResponse> => {
  return await axiosInstance.patch(`/product/${product.id}`, product);
};

export const deleteProduct = async (id: number): Promise<AxiosResponse> => {
  return await axiosInstance.delete(`/product/${id}`);
};
