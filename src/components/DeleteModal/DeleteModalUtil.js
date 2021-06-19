export const findIsDefaultPlaylist = (playlistId) => {
  return ["liked", "saved", "watch-later", "watched"].includes(playlistId);
};

export const deletePlaylist = (
  navigate,
  dispatch,
  playlistId,
  setshowDeleteModal
) => {
  navigate("/playlists", { replace: true });
  ["liked", "saved", "watch-later", "watched"].includes(playlistId)
    ? dispatch({ type: "REMOVE_ALL_VIDEOS", payload: { playlistId } })
    : dispatch({ type: "DELETE_PLAYLIST", payload: { playlistId } });
  setshowDeleteModal(() => false);
};
