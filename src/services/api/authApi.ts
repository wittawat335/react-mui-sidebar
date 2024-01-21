import axios, { AxiosInstance } from "axios";
import { Authen } from "@/types/Authen";
import { appConfig } from "../../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
});

export async function login(auth: Authen) {
  try {
    return await axiosInstance.post("Authen/Login", auth);
  } catch (error) {
    console.log(error);
  }
}
