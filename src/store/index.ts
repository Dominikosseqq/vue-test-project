import { endpoints } from "@/helpers/constants";
import {
  mapFilterInputIntoRequestParams,
  prepareGiphsDataFromRequest,
} from "@/helpers/giphyApi/giphyApi";
import { GiphsToDisplay, GiphFilterInput } from "@/interfaces/giphyApiTypes";
import { getGiphyRequest } from "@/services/giphyApi";
import { AxiosResponse } from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    searchText: "Witcher",
    giphsToDisplay: {} as GiphsToDisplay,
  },
  getters: {},
  mutations: {
    setSearchText(state, payload) {
      state.searchText = payload;
    },

    setGiphsToDisplay(state, data: GiphsToDisplay) {
      state.giphsToDisplay = data;
    },
  },
  actions: {
    setSearchText({ commit }, payload) {
      commit("setSearchText", payload);
    },

    getTrendingGiphs({ commit }, filter: GiphFilterInput) {
      const endpoint = endpoints.trending;
      const options = mapFilterInputIntoRequestParams(filter);

      getGiphyRequest(endpoint, options).then((res: AxiosResponse): void => {
        const giphsToDisplay = prepareGiphsDataFromRequest(res);
        commit("setGiphsToDisplay", giphsToDisplay);
      });
    },

    getSearchedGiphs({ commit }, filter: GiphFilterInput) {
      const endpoint = endpoints.search;
      const options = mapFilterInputIntoRequestParams(filter);

      getGiphyRequest(endpoint, options).then((res: AxiosResponse): void => {
        const giphsToDisplay = prepareGiphsDataFromRequest(res);
        commit("setGiphsToDisplay", giphsToDisplay);
      });
    },
  },
  modules: {},
});
