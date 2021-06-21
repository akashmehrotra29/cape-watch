import { useState } from "react";
import { useAuth, useVideos } from "../../contexts";
import styles from "./VideoActionButtons.module.css";
import { AuthModal } from "../";

import {
  toggleIsInPlaylist,
  createNewPlaylist,
  getPlaylistByName,
  isInPlaylistByName,
  isInPlaylistById,
  togglePlaylistMenu,
} from "./VideoActionButtonsUtil";

export const VideoActionButtons = ({ video }) => {
  const [viewPlaylistMenu, setViewPlaylistMenu] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState("");
  const { playlists, dispatch } = useVideos();
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div>
      {showAuthModal && (
        <AuthModal setShowAuthModal={setShowAuthModal} dispatch={dispatch} />
      )}
      <div className={`${styles.buttonsWrap}`}>
        <span>
          <button
            className="btn btn-round"
            onClick={() =>
              toggleIsInPlaylist(
                getPlaylistByName("Saved Videos", playlists)._id,
                video,
                dispatch,
                user,
                setShowAuthModal
              )
            }
          >
            <span className={`material-icons-round`}>
              {isInPlaylistByName("Saved Videos", video, playlists)
                ? "bookmark"
                : "bookmark_border"}
            </span>
          </button>
        </span>
        <span>
          <button
            className="btn btn-round"
            onClick={() =>
              toggleIsInPlaylist(
                getPlaylistByName("Liked Videos", playlists)._id,
                video,
                dispatch,
                user,
                setShowAuthModal
              )
            }
          >
            <span className={`material-icons-round`}>
              {isInPlaylistByName("Liked Videos", video, playlists)
                ? "favorite"
                : "favorite_border"}
            </span>
          </button>
        </span>{" "}
        <span>
          <button
            className="btn btn-round"
            onClick={() =>
              toggleIsInPlaylist(
                getPlaylistByName("Watch Later Videos", playlists)._id,
                video,
                dispatch,
                user,
                setShowAuthModal
              )
            }
          >
            <span
              className={`${
                isInPlaylistByName("Watch Later Videos", video, playlists)
                  ? "material-icons"
                  : "material-icons-outlined"
              }`}
            >
              watch_later
            </span>
          </button>
        </span>{" "}
        <div>
          <button
            className="btn btn-round"
            onClick={() =>
              togglePlaylistMenu(user, setViewPlaylistMenu, setShowAuthModal)
            }
          >
            <span className={`material-icons-round`}>playlist_add</span>
          </button>

          {viewPlaylistMenu && (
            <div>
              <ul className={`${styles.list}`}>
                {playlists &&
                  playlists.map((playlist, idx) => (
                    <li key={playlist._id}>
                      <input
                        type="checkbox"
                        checked={isInPlaylistById(
                          playlist._id,
                          video,
                          playlists
                        )} // useref
                        onChange={() =>
                          toggleIsInPlaylist(
                            playlist.id,
                            video,
                            dispatch,
                            user,
                            setShowAuthModal
                          )
                        }
                      />
                      <span>{playlist.name}</span>
                    </li>
                  ))}
                <li
                  className={`${styles.playlistMenuItem} ${styles.flexCenter}`}
                >
                  <form
                    className={`${styles.flexCenter}`}
                    onSubmit={(event) =>
                      createNewPlaylist(
                        event,
                        newPlaylist,
                        setNewPlaylist,
                        playlists,
                        video,
                        dispatch,
                        user
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
                    onClick={() =>
                      togglePlaylistMenu(
                        user,
                        setViewPlaylistMenu,
                        setShowAuthModal
                      )
                    }
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
    </div>
  );
};
