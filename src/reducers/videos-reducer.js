export const videosReducer = (state, { type, payload }) => {
  switch (type) {
    case "LOAD_VIDEOS":
      return { ...state, videos: payload };

    case "LOAD_PLAYLISTS":
      return { ...state, playlists: payload };

    case "ADD_TO_HISTORY":
      const watchedPlaylist = findCurrentPlaylist(state, payload);
      const isInWatchedPlaylist = findIsPresentInPlaylist(
        watchedPlaylist,
        payload
      );
      if (!isInWatchedPlaylist) {
        return {
          ...state,
          playlists: state.playlists.map((playlist) =>
            playlist._id === payload.playlistId
              ? { ...playlist, videos: [...playlist.videos, payload.videoId] }
              : playlist
          ),
        };
      }
      return state;

    case "TOGGLE_IN_PLAYLIST":
      const currentPlaylist = findCurrentPlaylist(state, payload);
      const isPresentInPlaylist = findIsPresentInPlaylist(
        currentPlaylist,
        payload
      );
      return isPresentInPlaylist
        ? removeFromPlaylist(state, payload)
        : addToPlaylist(state, payload);

    case "CREATE_NEW_PLAYLIST":
      return {
        ...state,
        playlists: [
          ...state.playlists,
          {
            name: payload.playlistName,
            _id: payload._id,
            videos: [payload.videoId],
          },
        ],
      };

    case "UPDATE_PLAYLIST_NAME":
      return {
        ...state,
        playlists: state.playlists.map((playlistItem) =>
          playlistItem._id === payload._id
            ? { ...playlistItem, name: payload.name }
            : playlistItem
        ),
      };

    case "DELETE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (playlistItem) => playlistItem._id !== payload.playlistId
        ),
      };

    case "REMOVE_ALL_VIDEOS":
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist._id === payload.playlistId
            ? { ...playlist, videos: [] }
            : playlist
        ),
      };

    case "RESET_PLAYLISTS":
      return {
        ...state,
        playlists: [],
      };

    default:
      return state;
  }
};

const findCurrentPlaylist = (state, payload) =>
  state.playlists.find((playlist) => playlist._id === payload.playlistId);

const findIsPresentInPlaylist = (currentPlaylist, payload) =>
  currentPlaylist.videos.find(
    (playlistVideoId) => playlistVideoId === payload.videoId
  );

const removeFromPlaylist = (state, { videoId, playlistId }) => {
  return {
    ...state,
    playlists: state.playlists.map((playlist) =>
      playlist._id === playlistId
        ? {
            ...playlist,
            videos: playlist.videos.filter(
              (playlistVideoId) => playlistVideoId !== videoId
            ),
          }
        : playlist
    ),
  };
};

const addToPlaylist = (state, { videoId, playlistId }) => {
  return {
    ...state,
    playlists: state.playlists.map((playlist) =>
      playlist._id === playlistId
        ? { ...playlist, videos: [...playlist.videos, videoId] }
        : playlist
    ),
  };
};
