import { IProduct } from "@/types/Product";
import axiosInstance from "./axiosInstance";

export async function getList() {
  return await axiosInstance.get("/Products");
}

export async function get(id: string) {
  return await axiosInstance.get(`/product/${id}`);
}

export async function add(request: IProduct) {
  return await axiosInstance.post("/product", request);
}

export async function update(request: IProduct) {
  return await axiosInstance.patch(`/product/${request.id}`, request);
}

export async function deleteProduct(id: string) {
  return await axiosInstance.delete(`/product/${id}`);
}
