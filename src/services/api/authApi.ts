import { appConfig } from "../../data/config";
import { IRegister } from "@/types/Register";
import axiosInstance from "./axiosInstance";

// const http: AxiosInstance = axios.create({
//   baseURL: appConfig.baseApiUrl,
// });

export async function login(request: { email: string; password: string }) {
  return await axiosInstance.post("Authenticate/login", request);
}

export async function register(request: IRegister) {
  return await axiosInstance.post("Authenticate/register", request);
}
