import axiosInstance from "./axiosInstance";
import { IUser } from "@/types/User";

export async function getList() {
  return await axiosInstance.get("/users");
}

export async function get(id: string) {
  return await axiosInstance.get(`/users/${id}`);
}

export async function add(request: IUser) {
  return await axiosInstance.post("/users", request);
}

export async function update(request: IUser) {
  return await axiosInstance.patch(`/users/${request.userId}`, request);
}

export async function deleteUsers(id: string) {
  return await axiosInstance.delete(`/users/${id}`);
}
