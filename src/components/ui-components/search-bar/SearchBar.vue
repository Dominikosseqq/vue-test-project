<template>
  <input v-model="searchInputText" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { debounce } from "lodash-es";
import store from "@/store";
import { debouncedRequestAfterType } from "./SearchBar";

export default defineComponent({
  name: "SearchBar",
  data: () => ({
    searchInputText: store.state.searchText as string,
  }),
  watch: {
    searchInputText: debounce(debouncedRequestAfterType, 1000),
  },
});
</script>

<style lang="scss" scoped src="./SearchBar.scss" />
