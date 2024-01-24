import axios, { AxiosInstance } from "axios";
import { appConfig } from "../../config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
});

export async function login(request: { email: string; password: string }) {
  try {
    return await axiosInstance.post("Authenticate/Login", request);
  } catch (error) {
    console.log(error);
  }
}
