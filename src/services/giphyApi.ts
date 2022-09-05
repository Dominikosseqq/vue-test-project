import axios, { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";
const API_URL = process.env.VUE_APP_GIPHY_URL;
const API_KEY = process.env.VUE_APP_API_KEY;

// prepare axios's request with adapter for cache requests
const http = axios.create({
  baseURL: API_URL,
  headers: { "Cache-Control": "no-cache" },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
});

/**
 * apply params with api_key for gettin api data
 * @param endpoint {string}
 * @param options {AxiosRequestConfig}
 * @return {Promise<AxiosResponse>}
 */
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
