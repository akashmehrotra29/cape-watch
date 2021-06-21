import {
  createNewPlaylistService,
  toggleIsInPlaylistService,
} from "../../services/playlists-services";

export const toggleIsInPlaylist = async (
  playlistId,
  video,
  dispatch,
  user,
  setShowAuthModal
) => {
  !user && setShowAuthModal(true);
  try {
    const toggleIsInPlaylistResponse = await toggleIsInPlaylistService(
      playlistId,
      video
    );

    toggleIsInPlaylistResponse.data.success &&
      dispatch({
        type: "TOGGLE_IN_PLAYLIST",
        payload: { videoId: video._id, playlistId: playlistId },
      });
  } catch (error) {
    console.log(error);
  }
};

export const togglePlaylistMenu = (
  user,
  setViewPlaylistMenu,
  setShowAuthModal
) => {
  user ? setViewPlaylistMenu((prev) => !prev) : setShowAuthModal(true);
};

export const getPlaylistById = (playlistId, playlists) => {
  return playlists.filter((playlist) => playlist._id === playlistId)?.[0];
};

export const isInPlaylistById = (playlistId, video, playlists) => {
  const playlist = getPlaylistById(playlistId, playlists);
  return playlist.videos.find(
    (playlistVideoId) => playlistVideoId === video._id
  );
};

export const getPlaylistByName = (playlistName, playlists) => {
  return playlists.filter((playlist) => playlist.name === playlistName)?.[0];
};

export const isInPlaylistByName = (playlistName, video, playlists) => {
  const playlist = getPlaylistByName(playlistName, playlists);
  return playlist.videos.find(
    (playlistVideoId) => playlistVideoId === video._id
  );
};

export const createNewPlaylist = async (
  event,
  newPlaylist,
  setNewPlaylist,
  playlists,
  video,
  dispatch,
  user
) => {
  event.preventDefault();
  setNewPlaylist("");
  if (newPlaylist && !getPlaylistByName(newPlaylist, playlists)) {
    try {
      const newPlaylistResponse = await createNewPlaylistService(
        user,
        newPlaylist,
        video
      );

      newPlaylistResponse.data.success &&
        dispatch({
          type: "CREATE_NEW_PLAYLIST",
          payload: {
            _id: newPlaylistResponse.data.playlist._id,
            playlistName: newPlaylist,
            videoId: video._id,
          },
        });
    } catch (error) {
      console.log(error);
    }
  }
};
