export const toggleInPlaylist = (playlistId, video, dispatch) => {
  dispatch({
    type: "TOGGLE_IN_PLAYLIST",
    payload: { videoId: video.id, playlistId: playlistId }
  });
};

export const getPlaylistById = (playlistId, playlists) => {
  return playlists.filter((playlist) => playlist.id === playlistId)?.[0]; //to avoid error:undefined if videos[] is empty
};

export const isInPlaylist = (playlistId, video, playlists) => {
  const playlist = getPlaylistById(playlistId, playlists);
  return playlist.videos.find(
    (playlistVideoId) => playlistVideoId === video.id
  );
};

export const getPlaylistByName = (playlistName, playlists) => {
  return playlists.filter((playlist) => playlist.name === playlistName)?.[0];
};

export const createNewPlaylist = (
  event,
  newPlaylist,
  setNewPlaylist,
  playlists,
  video,
  dispatch
) => {
  event.preventDefault(); // to stop rerender on submit
  setNewPlaylist("");
  if (newPlaylist && !getPlaylistByName(newPlaylist, playlists)) {
    dispatch({
      type: "CREATE_NEW_PLAYLIST",
      payload: { playlistName: newPlaylist, videoId: video.id }
    });
  }
};
