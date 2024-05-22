import { axiosConfig } from "../../config";

export const restClient = {
  get: async (url, queryParams) => {
    const axiosResponse = await axiosConfig({
      method: "get",
      url,
      params: queryParams,
    });
    return axiosResponse;
  },
  post: async (url, data, queryParams) => {
    const axiosResponse = await axiosConfig({
      method: "post",
      url,
      params: queryParams,
      data,
    });
    return axiosResponse;
  },
  put: async (url, data, queryParams) => {
    const axiosResponse = await axiosConfig({
      method: "put",
      url,
      params: queryParams,
      data,
    });
    return axiosResponse;
  },
  delete: async (url, queryParams) => {
    const axiosResponse = await axiosConfig({
      method: "delete",
      url,
      params: queryParams,
    });
    return axiosResponse;
  },
};
