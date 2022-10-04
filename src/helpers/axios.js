import axios from "axios";

export const AXIOS = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

AXIOS.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers.authorization = token;
    }
    return request;
  },
  (error) => {
    Promise.reject(error);
  }
);
