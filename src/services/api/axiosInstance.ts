import { appConfig } from "@/data/config";
import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
});

const token = localStorage.getItem("token");
axiosInstance.interceptors.request.use(
  (config) => {
    //const token = '{TOKEN}'
    const auth = token ? `Bearer ${token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
