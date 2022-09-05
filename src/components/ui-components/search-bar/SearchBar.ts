import { applyParamsToUrl } from "@/helpers/params/applyParamsToUrl";
import store from "@/store";
import { LocationQueryRaw } from "vue-router";

/**
 * Function for debounce input (don't allow too many request) + making
 * requests for api and set the search text
 * @param newVal {string}
 */
export const debouncedRequestAfterType = (newVal: string): void => {
  const query = store.state.giphsToDisplay.filter as LocationQueryRaw;
  const searchQuery = {
    q: newVal !== "" ? newVal : undefined,
    limit: store.state.currentLimit,
    offset: 0,
  };
  Object.assign(query, searchQuery);
  const action = newVal.length ? "getSearchedGiphs" : "getTrendingGiphs";
  store.dispatch(action, query);
  store.dispatch("setSearchText", newVal);
  applyParamsToUrl(query);
};
