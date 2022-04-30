import axios, { AxiosInstance } from "axios";
import {
  interceptorRequest,
  interceptorRequestError,
  interceptorResponse,
  interceptorResponseError,
} from "./interceptors";

// Create an axios instance
export const http: AxiosInstance = axios.create({
  timeout: 8000, // Request timeout
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:3000/" : "", // should come from .env file
});

http.interceptors.response.use(interceptorResponse, interceptorResponseError);
http.interceptors.request.use(interceptorRequest, interceptorRequestError);
