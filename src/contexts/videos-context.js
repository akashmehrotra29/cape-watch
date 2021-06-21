import { createContext, useContext, useReducer } from "react";
import { videosReducer } from "../reducers";

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [{ videos, playlists }, dispatch] = useReducer(videosReducer, {
    videos: [],
    playlists: [],
  });

  return (
    <VideosContext.Provider value={{ videos, playlists, dispatch }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => {
  return useContext(VideosContext);
};
