// Setting up Axios

import axios from "axios";

export const http = axios.create({});

const token = localStorage.getItem("token");
console.log(token);
axios.interceptors.request.use((request) => {
  request.headers.Authorization = `Bearer ${token}`;
  return request;
});
