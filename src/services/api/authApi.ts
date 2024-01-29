import axios, { AxiosInstance } from "axios";
import { appConfig } from "../../data/config";
import { IRegister } from "@/types/Register";

const http: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
});

export async function login(request: { email: string; password: string }) {
  return await http.post("Authenticate/Login", request);
}

export async function register(request: IRegister) {
  return await http.post("Authenticate/register", request);
}
