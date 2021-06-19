export const getPlaylistById = (playlistId, playlists) => {
  return playlists.find((playlist) => playlist.id === playlistId);
};

export const editButtonHandler = (
  isEditMode,
  setIsEditMode,
  playlistNameRef,
  playlist,
  playlistName,
  dispatch
) => {
  if (!isEditMode) {
    playlistNameRef.current.focus();
  } else {
    dispatch({
      type: "UPDATE_PLAYLIST_NAME",
      payload: { id: playlist.id, name: playlistName }
    });
  }
  setIsEditMode((isEditMode) => !isEditMode);
};

export const findIsDefaultPlaylist = (playlistId) =>
  ["liked", "saved", "watch-later", "watched"].includes(playlistId);

export const findIsWatchedPlaylist = (playlistId) => playlistId === "watched";
