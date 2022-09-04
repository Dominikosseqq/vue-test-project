export const applyParamsToUrl = (history: History, newVal: string): void => {
  const newQuery = newVal ? `q=${newVal}` : "";
  const oldQuery = history.state.current;
  let currentQuery = oldQuery;
  if (!oldQuery.includes("?")) {
    currentQuery = `${oldQuery}?${newQuery}`;
  } else if (!oldQuery.includes("q")) {
    currentQuery = `${oldQuery}${newQuery.length ? `&${newQuery}` : ""}`;
  }
  if (oldQuery.includes("q")) {
    const newCurrent = oldQuery
      .replace("/?", "")
      .split("&")
      .map((param: string) => {
        if (param.includes("q=")) {
          return newQuery;
        }
        return param;
      })
      .join("&");

    currentQuery = `/?${newCurrent}`;
  }
  if (currentQuery.startsWith("/?&")) {
    currentQuery = currentQuery.replace("/?&", "/?");
  }
  if (currentQuery.at(-1) === "?" || currentQuery.at(-1) === "&") {
    currentQuery = currentQuery.slice(0, -1);
  }
  if (currentQuery.length < 3) {
    currentQuery = "/";
  }
  console.log(666, currentQuery);
  history.pushState(history.state, "", `${currentQuery}`);
};
