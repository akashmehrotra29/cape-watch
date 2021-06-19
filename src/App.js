import { Routes, Route } from "react-router-dom";
import { useVideos } from "./contexts";
import { videosDB } from "./videos-db";
import "./styles.css";
import { useEffect } from "react";
import { Navbar } from "./components";
import { Home, VideoDetails, Playlists, PlaylistDetails } from "./pages";

export default function App() {
  const { dispatch } = useVideos();
  const getVideos = () => {
    //do server call to get videos
    dispatch({ type: "LOAD_VIDEOS", payload: videosDB });
  };
  useEffect(() => getVideos(), []);
  // console.log(videosDB);
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoDetails />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/playlists/:playlistId" element={<PlaylistDetails />} />
      </Routes>
    </div>
  );
}
