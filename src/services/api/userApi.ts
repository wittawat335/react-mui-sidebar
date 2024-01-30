import axios, { AxiosInstance } from "axios";
import { IUser } from "@/types/User";
import { appConfig } from "@/data/config";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { http } from "./apiClient";
import axiosInstance from "./axiosInstance";

let config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

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
