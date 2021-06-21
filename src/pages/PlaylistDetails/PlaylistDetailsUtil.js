import { updatePlaylistNameService } from "../../services/playlists-services";

export const getPlaylistById = (playlistId, playlists) => {
  return playlists.find((playlist) => playlist._id === playlistId);
};

export const editButtonHandler = async (
  isEditMode,
  setIsEditMode,
  playlistNameRef,
  playlist,
  playlistName,
  dispatch,
  playlistId
) => {
  if (!isEditMode) {
    playlistNameRef.current.focus();
  } else {
    try {
      const updatePlaylistNameResponse = await updatePlaylistNameService(
        playlistId,
        playlistName
      );
      if (updatePlaylistNameResponse.data.success) {
        dispatch({
          type: "UPDATE_PLAYLIST_NAME",
          payload: { _id: playlist._id, name: playlistName }, // check if playlistId = playlist._id
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  setIsEditMode((isEditMode) => !isEditMode);
};

export const findIsDefaultPlaylist = (playlistName) =>
  [
    "Watched Videos",
    "Liked Videos",
    "Saved Videos",
    "Watch Later Videos",
  ].includes(playlistName);

export const findIsWatchedPlaylist = (playlistName) =>
  playlistName === "Watched Videos";
