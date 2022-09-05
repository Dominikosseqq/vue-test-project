import { GiphFilterInput } from "@/interfaces/giphyApiTypes";
import { KEY_PARAMS_API_GIPHY } from "@/helpers/constants";
import { LocationQuery } from "vue-router";

/**
 * function that get variables (query params) from location
 * @param query {LocationQuery}
 * @return {GiphFilterInput}
 */
export function getParamsFromUrl(query: LocationQuery): GiphFilterInput {
  const filter = Object.keys(query).reduce((out, key) => {
    const newObj = KEY_PARAMS_API_GIPHY.includes(key)
      ? { [key]: query[key] }
      : {};
    return Object.assign(out, newObj);
  }, {});

  return filter;
}
