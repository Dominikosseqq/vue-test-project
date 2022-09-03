<template>
  <input v-model="searchInputText" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { debounce } from "lodash-es";
import store from "@/store";
import { GiphFilterInput } from "@/interfaces/giphyApiTypes";

export default defineComponent({
  name: "SearchBar",
  data: () => ({
    searchInputText: store.state.searchText as string,
  }),
  beforeMount() {
    store.dispatch("getSearchedGiphs", {
      q: store.state.searchText,
    } as GiphFilterInput);
  },
  watch: {
    searchInputText: debounce((newVal: string): void => {
      if (newVal.length) {
        store.dispatch("getSearchedGiphs", { q: newVal } as GiphFilterInput);
      } else {
        store.dispatch("getTrendingGiphs");
      }
    }, 1000),
  },
});
</script>

<style lang="scss" scoped src="./SearchBar.scss" />
