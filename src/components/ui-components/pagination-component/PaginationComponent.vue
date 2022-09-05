<template>
  <div class="pagination-main-container">
    <div class="current-page-container">
      {{ `current page: ${currentPage}` }}
    </div>
    <div class="pagination-container">
      <button
        @click="(event) => changePage(event, '-')"
        :disabled="isFirstPage"
      >
        {{ "<" }}
      </button>
      <button @click="(event) => changePage(event, 1)" :disabled="isFirstPage">
        {{ "1" }}
      </button>
      <button
        @click="(event) => changePage(event, pagesCount)"
        :disabled="isLastPage"
      >
        {{ pagesCount }}
      </button>
      <button @click="(event) => changePage(event, '+')" :disabled="isLastPage">
        {{ ">" }}
      </button>
    </div>
  </div>
</template>
<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { changePage } from "./PaginationComponent";

export default defineComponent({
  name: "PaginationComponent",
  props: {
    pagesCount: { type: Number, default: 1 },
    isLastPage: Boolean,
    isFirstPage: Boolean,
  },
  data: function () {
    return {
      currentPage:
        store.state.giphsToDisplay.pagination.offset > 0
          ? store.state.currentPage
          : store.state.giphsToDisplay.pagination.offset + 1,
    };
  },
  methods: {
    changePage: changePage,
  },
});
</script>

<style lang="scss" scoped src="./PaginationComponent.scss" />
