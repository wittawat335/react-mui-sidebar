import axiosInstance from "./axiosInstance";
import { IUser } from "@/types/User";

export async function getList() {
  return await axiosInstance.get<IUser[]>("/user");
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
