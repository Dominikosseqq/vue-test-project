import store from "@/store";

export const changePage = (event: Event, page: number | string) => {
  let newPage = page;
  if (page === "+") {
    newPage = store.state.currentPage + 1;
  }

  if (page === "-") {
    newPage = store.state.currentPage - 1;
  }

  store.dispatch("setCurrentPage", newPage);
};
