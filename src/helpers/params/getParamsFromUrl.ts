import { GiphFilterInput } from "@/interfaces/giphyApiTypes";
import { keyParamsApiGiphy } from "@/helpers/constants";

export function getParamsFromUrl(history: History): GiphFilterInput {
  const uri = new URLSearchParams(history.state.current.replace("/?", ""));
  const filter = [...uri.keys()].reduce((out, key) => {
    const newObj = keyParamsApiGiphy.includes(key)
      ? { [key]: uri.get(key) }
      : {};
    return Object.assign(out, newObj);
  }, {});

  return filter;
}
