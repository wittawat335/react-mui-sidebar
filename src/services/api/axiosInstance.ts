import { appConfig } from "@/data/config";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
});

axiosInstance.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("token")!);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default axiosInstance;

// export const axiosPrivate: AxiosInstance = axios.create({
//   baseURL: appConfig.baseApiUrl,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${localStorage.getItem("token")}`,
//   },
//   //withCredentials: true,
// });
