import store from "@/store";
import { LocationQueryRaw } from "vue-router";
import { applyParamsToUrl } from "../params/applyParamsToUrl";

/**
 * @param providedNumber {number}
 * @param min {number}
 * @param max {number}
 * @return {number}
 */
const checkCurrentLimit = (
  providedNumber: number,
  min = 10,
  max = 50
): number => {
  if (providedNumber > max) {
    return max;
  }
  if (providedNumber < min) {
    return min;
  }
  return providedNumber;
};

/**
 * @param providedOffset {number}
 * @param min {number}
 * @return {number}
 */
const calculateOffset = (providedOffset: number, min = 0): number => {
  if (providedOffset < min) {
    return min;
  }

  return providedOffset;
};

/**
 * Query preparation with all params and send request to API
 * @param routeQuery {LocationQueryRaw}
 */
export const prepareQueryAndSendRequest = (routeQuery: LocationQueryRaw) => {
  const limit = checkCurrentLimit(store.state.currentLimit);
  const currentPage = store.state.currentPage;

  const query = routeQuery || {};

  const searchQuery = {
    q: store.state.searchText,
  };

  const paginationQuery = {
    offset: calculateOffset((currentPage - 1) * limit),
  };
  const limitQuery = {
    limit,
  };
  const newQuery = Object.assign(
    query,
    searchQuery,
    paginationQuery,
    limitQuery
  );
  const action = newQuery?.q ? "getSearchedGiphs" : "getTrendingGiphs";
  store.dispatch(action, newQuery);
  applyParamsToUrl(newQuery);
};
