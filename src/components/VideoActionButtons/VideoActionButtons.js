import { useState } from "react";
import { useVideos } from "../../contexts";
import styles from "./VideoActionButtons.module.css";

import {
  toggleInPlaylist,
  isInPlaylist,
  createNewPlaylist
} from "./VideoActionButtonsUtil";

export const VideoActionButtons = ({ video }) => {
  const [viewPlaylistMenu, setViewPlaylistMenu] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState("");
  const { playlists, dispatch } = useVideos();

  const togglePlaylistMenu = () => {
    setViewPlaylistMenu((prev) => !prev);
  };

  return (
    <div className={`${styles.buttonsWrap}`}>
      <span>
        <button
          className="btn btn-round"
          onClick={() => toggleInPlaylist("saved", video, dispatch)}
        >
          <span className={`material-icons-round`}>
            {isInPlaylist("saved", video, playlists)
              ? "bookmark"
              : "bookmark_border"}
          </span>
        </button>
      </span>{" "}
      <span>
        <button
          className="btn btn-round"
          onClick={() => toggleInPlaylist("liked", video, dispatch)}
        >
          <span className={`material-icons-round`}>
            {isInPlaylist("liked", video, playlists)
              ? "favorite"
              : "favorite_border"}
          </span>
        </button>
      </span>{" "}
      <span>
        <button
          className="btn btn-round"
          onClick={() => toggleInPlaylist("watch-later", video, dispatch)}
        >
          <span
            className={`${
              isInPlaylist("watch-later", video, playlists)
                ? "material-icons"
                : "material-icons-outlined"
            }`}
          >
            watch_later
          </span>
        </button>
      </span>{" "}
      <div>
        <button className="btn btn-round" onClick={togglePlaylistMenu}>
          <span className={`material-icons-round`}>playlist_add</span>
        </button>

        {viewPlaylistMenu && (
          <div>
            <ul className={`${styles.list}`}>
              {playlists &&
                playlists.map((playlist, idx) => (
                  <li key={playlist.id}>
                    <input
                      type="checkbox"
                      checked={isInPlaylist(playlist.id, video, playlists)} // useref
                      onChange={() =>
                        toggleInPlaylist(playlist.id, video, dispatch)
                      }
                    />
                    <span>{playlist.name}</span>
                  </li>
                ))}
              <li className={`${styles.playlistMenuItem} ${styles.flexCenter}`}>
                <form
                  className={`${styles.flexCenter}`}
                  onSubmit={(event) =>
                    createNewPlaylist(
                      event,
                      newPlaylist,
                      setNewPlaylist,
                      playlists,
                      video,
                      dispatch
                    )
                  }
                >
                  <input
                    className={`${styles.newPlaylistInput} ${styles.input}`}
                    value={newPlaylist}
                    onChange={(event) =>
                      setNewPlaylist(() => event.target.value)
                    }
                    type="text"
                  />
                  <button>
                    <span className={`material-icons-outlined`}>add</span>
                  </button>
                </form>
              </li>
              <li>
                <button
                  onClick={togglePlaylistMenu}
                  className="btn btn-primary"
                >
                  add to playlist
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
