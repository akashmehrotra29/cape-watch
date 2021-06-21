import axios from "axios";

export const getPlaylistsService = (user) => {
  return axios.get(
    `https://capewatch.akashmehrotra29.repl.co/playlists/${user._id}`
  );
};

export const createNewPlaylistService = (user, newPlaylist, video) => {
  return axios.post(`https://capewatch.akashmehrotra29.repl.co/playlists`, {
    user: user._id,
    name: newPlaylist,
    videos: [video._id],
  });
};

export const toggleIsInPlaylistService = (playlistId, video) => {
  return axios.post(
    `https://capewatch.akashmehrotra29.repl.co/playlists/${playlistId}`,
    { videoId: video._id }
  );
};

export const updatePlaylistNameService = (playlistId, playlistName) => {
  return axios.post(
    `https://capewatch.akashmehrotra29.repl.co/playlists/update/${playlistId}`,
    {
      newName: playlistName,
    }
  );
};

export const removeAllVideosService = (playlistId) => {
  return axios.post(
    `https://capewatch.akashmehrotra29.repl.co/playlists/remove/${playlistId}`
  );
};

export const deletePlaylistService = (playlistId) => {
  return axios.delete(
    `https://capewatch.akashmehrotra29.repl.co/playlists/${playlistId}`
  );
};
