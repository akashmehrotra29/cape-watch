import { createContext, useContext, useReducer } from "react";
import { videosReducer } from "../reducers";

export const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
  const [{ videos, playlists, users }, dispatch] = useReducer(videosReducer, {
    videos: [],
    playlists: [
      {
        name: "Watched Videos",
        id: "watched",
        videos: []
      },
      {
        name: "Liked Videos",
        id: "liked",
        videos: []
      },
      {
        name: "Saved Videos",
        id: "saved",
        videos: []
      },
      {
        name: "Watch Later Videos",
        id: "watch-later",
        videos: []
      }
    ],
    users: []
  });
  console.log({ playlists });
  return (
    <VideosContext.Provider value={{ videos, playlists, users, dispatch }}>
      {children}
    </VideosContext.Provider>
  );
};

export const useVideos = () => {
  return useContext(VideosContext);
};
