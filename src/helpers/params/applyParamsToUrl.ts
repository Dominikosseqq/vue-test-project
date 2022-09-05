import { LocationQueryRaw } from "vue-router";

/**
 * Function that only changes url without redirect from actual query
 * @param query {LocationQueryRaw}
 */
export const applyParamsToUrl = (query: LocationQueryRaw): void => {
  const link = Object.keys(query)
    .filter((key: string) => query[key] !== undefined && query[key] !== "")
    .map((key: string) => {
      const value = query[key];
      return `${key}=${value}`;
    })
    .join("&");

  history.replaceState({}, "", `/?${link}`);
};
