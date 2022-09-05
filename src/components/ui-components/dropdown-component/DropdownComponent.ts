import store from "@/store";

export const selectLimit = (val: string) => {
  store.dispatch("setCurrentLimit", +val);
};
