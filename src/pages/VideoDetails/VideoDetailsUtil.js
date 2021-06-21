import { toggleIsInPlaylistService } from "../../services/playlists-services";

export const addToHistory = async (playlistId, video, dispatch) => {
  try {
    const addToHistoryResponse = await toggleIsInPlaylistService(
      playlistId,
      video
    );
    addToHistoryResponse.data.success &&
      dispatch({
        type: "ADD_TO_HISTORY",
        payload: { videoId: video.id, playlistId: playlistId },
      });
  } catch (error) {
    console.log(error);
  }
};
