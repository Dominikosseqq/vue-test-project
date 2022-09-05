<template>
  <div>
    <button @click="(event) => changePage(event, '-')" :disabled="isFirstPage">
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
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { changePage } from "./PaginationComponent";

export default defineComponent({
  name: "PaginationComponent",
  props: {
    pagesCount: { type: Number, default: 1 },
    isLastPage: Boolean,
    isFirstPage: Boolean,
  },
  methods: {
    changePage: changePage,
  },
});
</script>

<style lang="scss" scoped src="./PaginationComponent.scss" />
