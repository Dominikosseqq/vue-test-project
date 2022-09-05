import store from "@/store";

export const changePage = (event: Event, page: number | string) => {
  store.dispatch("setCurrentPage", page);
};
