import axios from "axios";

export const getVideosService = () => {
  return axios.get("https://capewatch.akashmehrotra29.repl.co/videos");
};
