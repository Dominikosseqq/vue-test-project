<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <SearchBar />
    <div>
      {{ "filter section" }}
    </div>
    <div class="home-container">
      <div v-for="giph in giphsObj.data" :key="giph.id">
        <div v-lazy-container="{ selector: 'img', loading: './logo.png' }">
          <img
            :data-src="giph.fixed_height_downsampled.webp"
            :alt="giph.title"
            :height="giph.fixed_height_downsampled.height"
            width="300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GiphsToDisplay } from "@/interfaces/giphyApiTypes";
import SearchBar from "@/components/ui-components/search-bar/SearchBar.vue";
import store from "@/store";
import { getParamsFromUrl } from "@/helpers/params/getParamsFromUrl";
import { applyParamsToUrl } from "@/helpers/params/applyParamsToUrl";

export default defineComponent({
  name: "HomePage",
  components: {
    SearchBar: SearchBar,
  },
  computed: {
    giphsObj() {
      return store.state.giphsToDisplay as GiphsToDisplay;
    },
  },
  beforeMount() {
    const params = getParamsFromUrl(history);
    const isParamsIncludesQuery = Object.keys(params).includes("q");
    const searchText = store.state.searchText;
    if (!isParamsIncludesQuery) {
      Object.assign(params, {
        q: searchText,
      });
      applyParamsToUrl(history, searchText);
    }

    const action = Object.keys(params).includes("q")
      ? "getSearchedGiphs"
      : "getTrendingGiphs";

    store.dispatch(action, params);
  },
});
</script>

<style lang="scss" scoped src="./HomePage.scss" />
