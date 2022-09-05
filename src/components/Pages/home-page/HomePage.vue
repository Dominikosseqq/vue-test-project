<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <SearchBar />
    <DropdownComponent
      v-if="!isLoading"
      :disabled="!isLoading && !giphsObj.data.length"
    />
    <PaginationComponent
      v-if="!isLoading"
      :isLastPage="isLastPage"
      :isFirstPage="isFirstPage"
      :pagesCount="pagesCount"
    />
    <div class="giphs-container" v-if="!isLoading">
      <div v-for="giph in giphsObj.data" :key="giph.id">
        <div v-lazy-container="lazyProps">
          <img
            :data-src="giph.fixed_height_downsampled.webp"
            :alt="giph.title"
            :height="giph.fixed_height_downsampled.height"
            width="300"
          />
        </div>
      </div>
    </div>
    <div v-if="isLoading">
      {{ "loading ..." }}
    </div>
    <div v-if="!isLoading && !giphsObj.data.length">
      {{ "Sorry, any giphs are found, please try again." }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GiphsToDisplay } from "@/interfaces/giphyApiTypes";
import SearchBar from "@/components/ui-components/search-bar/SearchBar.vue";
import store from "@/store";
import PaginationComponent from "@/components/ui-components/pagination-component/PaginationComponent.vue";
import { prepareQueryAndSendRequest } from "@/helpers/giphy-api/prepareQueryAndSendRequest";
import DropdownComponent from "@/components/ui-components/dropdown-component/DropdownComponent.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    SearchBar: SearchBar,
    PaginationComponent: PaginationComponent,
    DropdownComponent: DropdownComponent,
  },
  computed: {
    lazyProps() {
      return { selector: "img", loading: "./logo.png" } as never;
    },
    giphsObj() {
      return store.state.giphsToDisplay as GiphsToDisplay;
    },
    currentPage() {
      return store.state.currentPage;
    },
    currentLimit() {
      return store.state.currentLimit;
    },
    isLoading() {
      return store.state.isLoading;
    },
    pagesCount() {
      return !store.state.isLoading
        ? Math.ceil(
            store.state.giphsToDisplay.pagination.total_count /
              store.state.currentLimit
          )
        : 1;
    },
    isLastPage() {
      return (
        !store.state.isLoading &&
        store.state.giphsToDisplay.pagination.count < store.state.currentLimit
      );
    },
    isFirstPage() {
      return (
        !store.state.isLoading && !store.state.giphsToDisplay.pagination.offset
      );
    },
  },
  beforeMount() {
    prepareQueryAndSendRequest(this.$route.query);
  },
  watch: {
    currentPage() {
      prepareQueryAndSendRequest(this.$route.query);
    },
    currentLimit() {
      prepareQueryAndSendRequest(this.$route.query);
    },
  },
});
</script>

<style lang="scss" scoped src="./HomePage.scss" />
