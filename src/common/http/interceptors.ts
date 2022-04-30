import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

export const interceptorRequest = async (config: AxiosRequestConfig) => {
  // can be used to handle auth token

  return config;
};

export const interceptorRequestError = (error: AxiosError) => {
  // Handle generic request error here
  console.log(error);

  return Promise.reject(error);
};

export const interceptorResponse = (response: AxiosResponse) => {
  return response.data;
};

export const interceptorResponseError = (error: AxiosError) => {
  // Handle generic response error here
  console.log(error);

  return Promise.reject(error);
};
