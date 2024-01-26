import { appConfig } from "@/config";
import axios, { AxiosInstance } from "axios";
import { useAppSelector } from "../redux/store";

//const user = useAppSelector((state) => state.auth.user);
const axiosInstance: AxiosInstance = axios.create({
  baseURL: appConfig.baseApiUrl,
  //headers: { Authorization: user?.token },
});

//axiosInstance.defaults.headers.common.Authorization = `Bearer token`;

export default axiosInstance;
