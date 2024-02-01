import { IRegister } from "@/types/Register";
import axiosInstance from "./axiosInstance";

export async function login(request: { email: string; password: string }) {
  return await axiosInstance.post("Authenticate/login", request);
}

export async function register(request: IRegister) {
  return await axiosInstance.post("Authenticate/register", request);
}
