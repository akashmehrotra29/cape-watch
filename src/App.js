import { Routes, Route } from "react-router-dom";
import { useVideos, useAuth } from "./contexts";
import "./styles.css";
import { useEffect } from "react";
import { Navbar } from "./components";
import {
  Home,
  VideoDetails,
  Playlists,
  PlaylistDetails,
  Login,
  Signup,
} from "./pages";
import { getVideosService } from "./services/videos-services";
import { getPlaylistsService } from "./services/playlists-services";
import { PrivateRoute } from "./PrivateRoute";

export default function App() {
  const { dispatch } = useVideos();
  const { user } = useAuth();

  const getVideos = async () => {
    try {
      const getVideosResponse = await getVideosService();
      getVideosResponse.data.success &&
        dispatch({
          type: "LOAD_VIDEOS",
          payload: getVideosResponse.data.videos,
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaylists = async () => {
    try {
      const getPlaylistsResponse = await getPlaylistsService(user);
      console.log(getPlaylistsResponse.data.playlists);
      getPlaylistsResponse.data.success &&
        dispatch({
          type: "LOAD_PLAYLISTS",
          payload: getPlaylistsResponse.data.playlists,
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  useEffect(() => {
    user && getPlaylists();
  }, [user]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<VideoDetails />} />
        <PrivateRoute path="/playlists" element={<Playlists />} />
        <PrivateRoute
          path="/playlists/:playlistId"
          element={<PlaylistDetails />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
