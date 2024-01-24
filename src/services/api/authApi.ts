import axios, { AxiosInstance } from "axios";
import { appConfig } from "../../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
});

export async function login(user: { email: string; password: string }) {
  try {
    return await axiosInstance.post("Authenticate/Login", user);
  } catch (error) {
    console.log(error);
  }
}
