import axios, { AxiosInstance } from "axios";
import { appConfig } from "../../data/config";
import { IRegister } from "@/types/Register";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
});

export async function login(request: { email: string; password: string }) {
  return await axiosInstance.post("Authenticate/Login", request);
}

export async function register(request: IRegister) {
  return await axiosInstance.post("Authenticate/register", request);
}
