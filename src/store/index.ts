import { ENDPOINTS_API_GIPHY } from "@/helpers/constants";
import {
  mapFilterInputIntoRequestParams,
  prepareGiphsDataFromRequest,
} from "@/helpers/giphy-api/giphyApi";
import { GiphsToDisplay, GiphFilterInput } from "@/interfaces/giphyApiTypes";
import { getGiphyRequest } from "@/services/giphyApi";
import { AxiosResponse } from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    searchText: "witcher",
    currentPage: 1,
    currentLimit: 50,
    isLoading: false,
    giphsToDisplay: {} as GiphsToDisplay,
  },
  getters: {},
  mutations: {
    setIsLoading(state, isLoading: boolean) {
      state.isLoading = isLoading;
    },

    setSearchText(state, text: string) {
      state.searchText = text;
    },

    setCurrentLimit(state, limit: number) {
      state.currentLimit = limit;
    },

    setCurrentPage(state, page: number) {
      state.currentPage = page;
    },

    setGiphsToDisplay(state, data: GiphsToDisplay) {
      state.giphsToDisplay = data;
    },
  },
  actions: {
    setSearchText({ commit }, text: string) {
      commit("setSearchText", text);
    },

    setCurrentLimit({ commit }, limit: number) {
      commit("setCurrentLimit", limit);
    },

    setCurrentPage({ commit }, page: number) {
      commit("setCurrentPage", page);
    },

    setIsLoading({ commit }, isLoading: boolean) {
      commit("setIsLoading", isLoading);
    },

    getTrendingGiphs({ commit }, filter: GiphFilterInput) {
      commit("setIsLoading", true);

      const endpoint = ENDPOINTS_API_GIPHY.trending;
      const options = mapFilterInputIntoRequestParams(filter);

      getGiphyRequest(endpoint, options)
        .then((res: AxiosResponse): void => {
          const giphsToDisplay = prepareGiphsDataFromRequest(res);
          commit("setGiphsToDisplay", giphsToDisplay);
        })
        .finally((): void => {
          commit("setIsLoading", false);
        });
    },

    getSearchedGiphs({ commit }, filter: GiphFilterInput) {
      commit("setIsLoading", true);

      const endpoint = ENDPOINTS_API_GIPHY.search;
      const options = mapFilterInputIntoRequestParams(filter);

      getGiphyRequest(endpoint, options)
        .then((res: AxiosResponse): void => {
          const giphsToDisplay = prepareGiphsDataFromRequest(res);
          commit("setGiphsToDisplay", giphsToDisplay);
        })
        .finally((): void => {
          commit("setIsLoading", false);
        });
    },
  },
  modules: {},
});
