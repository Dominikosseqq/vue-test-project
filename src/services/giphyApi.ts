import axios, { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
const API_URL = process.env.VUE_APP_GIPHY_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

const http = axios.create({
  baseURL: API_URL,
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
});

export const getGiphyRequest = async (
  endpoint: string,
  options: AxiosRequestConfig
): Promise<AxiosResponse> =>
  http.get(`${API_URL}/${endpoint}`, {
    ...options,
    params: {
      ...options.params,
      api_key: API_KEY,
    },
  });
