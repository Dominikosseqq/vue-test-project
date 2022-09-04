<template>
  <input v-model="searchInputText" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { debounce } from "lodash-es";
import store from "@/store";
import { GiphFilterInput } from "@/interfaces/giphyApiTypes";
import { getParamsFromUrl } from "@/helpers/params/getParamsFromUrl";
import { applyParamsToUrl } from "@/helpers/params/applyParamsToUrl";

export default defineComponent({
  name: "SearchBar",
  data: () => ({
    searchInputText: store.state.searchText as string,
  }),
  beforeCreate() {
    const params = getParamsFromUrl(history);
    if (Object.keys(params).includes("q")) {
      store.dispatch("setSearchText", params.q);
    }
  },
  watch: {
    searchInputText: debounce((newVal: string): void => {
      if (newVal.length) {
        store.dispatch("getSearchedGiphs", { q: newVal } as GiphFilterInput);
        applyParamsToUrl(history, newVal);
      } else {
        store.dispatch("getTrendingGiphs");
        applyParamsToUrl(history, newVal);
      }
    }, 1000),
  },
});
</script>

<style lang="scss" scoped src="./SearchBar.scss" />
