<template>
  <div>
    {{ "giphs per page: " }}
    <select v-model="selectLimit" :disabled="disabled">
      <option v-for="option in options" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { LIMITER_OPTIONS_API_GIPHY } from "@/helpers/constants";
import store from "@/store";
import { defineComponent } from "vue";
import { selectLimit } from "./DropdownComponent";

export default defineComponent({
  name: "DropdownComponent",
  props: {
    disabled: Boolean,
  },
  data: () => {
    return {
      selectLimit: `${store.state.currentLimit}`,
      options: LIMITER_OPTIONS_API_GIPHY,
    };
  },
  watch: {
    selectLimit: selectLimit,
  },
});
</script>

<style lang="scss" scoped src="./DropdownComponent.scss" />
