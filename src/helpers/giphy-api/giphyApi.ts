import {
  Datum,
  Giph,
  GiphFilterInput,
  GiphsToDisplay,
} from "@/interfaces/giphyApiTypes";
import { AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Prepare finally object from response data and add api_key to request from .env
 * @param response {AxiosResponse}
 * @return {GiphFilterInput}
 */
export const prepareGiphsDataFromRequest = (
  response: AxiosResponse
): GiphsToDisplay => {
  const { config, data: responseData } = response;
  const { data: originalData, pagination } = responseData;
  const data = originalData.map((giph: Datum): Giph => {
    const { id, images, title } = giph;
    const { fixed_height_downsampled } = images;
    return {
      id,
      title,
      fixed_height_downsampled,
    };
  }) as Array<Giph>;

  const filter = Object.keys(config.params).reduce((out, key) => {
    const newObj = key !== "api_key" ? { [key]: config.params[key] } : {};
    return Object.assign(out, newObj);
  }, {}) as GiphFilterInput;

  return {
    data,
    pagination,
    filter,
  };
};

/**
 * just map query to search query (params)
 * @param filter {GiphFilterInput}
 * @return {AxiosRequestConfig}
 */
export const mapFilterInputIntoRequestParams = (filter: GiphFilterInput) => {
  const { q, limit, offset } = filter || {};
  const options = {
    params: {
      q,
      limit,
      offset,
    },
  } as AxiosRequestConfig;

  return options;
};
