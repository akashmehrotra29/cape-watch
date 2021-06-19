export const addToHistory = (playlistId, video, dispatch) => {
  dispatch({
    type: "ADD_TO_HISTORY",
    payload: { videoId: video.id, playlistId: playlistId }
  });
};
