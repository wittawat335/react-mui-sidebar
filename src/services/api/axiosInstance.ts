import { appConfig } from "@/data/config";
import axios, { AxiosInstance } from "axios";

const token = localStorage.getItem("token");
const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
  headers: { Authorization: token },
});

//axiosInstance.defaults.headers.common.Authorization = `Bearer token`;

export default axiosInstance;
