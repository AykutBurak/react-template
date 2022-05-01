import { AxiosResponse } from "axios";

export const interceptorResponse = (response: AxiosResponse) => {
  return response.data;
};
