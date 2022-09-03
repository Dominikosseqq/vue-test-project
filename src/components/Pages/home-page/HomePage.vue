<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <SearchBar />
    <div class="">
      <div v-for="giph in giphsObj.data" :key="giph.id">
        <img
          :src="giph.fixed_height_downsampled.webp"
          :alt="giph.title"
          :height="giph.fixed_height_downsampled.height"
          width="300"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { GiphsToDisplay } from "@/interfaces/giphyApiTypes";
import SearchBar from "@/components/ui-components/search-bar/SearchBar.vue";
import store from "@/store";

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
});
</script>

<style lang="scss" scoped src="./HomePage.scss" />
