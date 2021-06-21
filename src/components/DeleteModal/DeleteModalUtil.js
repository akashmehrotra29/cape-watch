import {
  deletePlaylistService,
  removeAllVideosService,
} from "../../services/playlists-services";

export const findIsDefaultPlaylist = (playlistName) => {
  return [
    "Watched Videos",
    "Liked Videos",
    "Saved Videos",
    "Watch Later Videos",
  ].includes(playlistName);
};

export const deletePlaylist = async (
  navigate,
  dispatch,
  playlistId,
  playlistName,
  setshowDeleteModal
) => {
  navigate("/playlists", { replace: true });
  if (
    [
      "Watched Videos",
      "Liked Videos",
      "Saved Videos",
      "Watch Later Videos",
    ].includes(playlistName)
  ) {
    try {
      const removeAllVideosResponse = await removeAllVideosService(playlistId);
      removeAllVideosResponse.data.success &&
        dispatch({ type: "REMOVE_ALL_VIDEOS", payload: { playlistId } });
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const deletePlaylistResponse = await deletePlaylistService(playlistId);
      deletePlaylistResponse.data.success &&
        dispatch({ type: "DELETE_PLAYLIST", payload: { playlistId } });
    } catch (error) {
      console.log(error);
    }
  }
  setshowDeleteModal(() => false);
};
