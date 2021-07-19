import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useVideos } from "../../contexts";
import { VideoCard, DeleteModal, Loader } from "../../components";
import {
  getPlaylistById,
  editButtonHandler,
  findIsDefaultPlaylist,
} from "./PlaylistDetailsUtil";
import styles from "./PlaylistDetails.module.css";

export const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const { playlists, dispatch } = useVideos();

  const playlist = getPlaylistById(playlistId, playlists);

  const [showDeleteModal, setshowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [playlistName, setPlaylistName] = useState(playlist?.name);
  const playlistNameRef = useRef(null);

  const isDefaultPlaylist = findIsDefaultPlaylist(playlistName);

  return playlist ? (
    <div>
      {showDeleteModal && (
        <DeleteModal
          setshowDeleteModal={setshowDeleteModal}
          playlistId={playlistId}
          playlistName={playlistName}
        />
      )}
      <input
        className={`${styles.input}`}
        readOnly={!isEditMode}
        ref={playlistNameRef}
        value={playlistName}
        onChange={(e) => setPlaylistName(() => e.target.value)}
      />
      <span>
        {!isDefaultPlaylist && (
          <button
            onClick={() =>
              editButtonHandler(
                isEditMode,
                setIsEditMode,
                playlistNameRef,
                playlist,
                playlistName,
                dispatch,
                playlistId
              )
            }
          >
            <span className="material-icons-outlined">
              {isEditMode ? "done" : "edit"}
            </span>
          </button>
        )}
        <button onClick={() => setshowDeleteModal(() => true)}>
          <span className="material-icons-outlined">delete</span>
        </button>
      </span>
      <ul className={`${styles.videoCardContainer}`}>
        {playlist.videos.length !== 0 ? (
          playlist.videos.map((videoId) => (
            <li key={videoId} className={`${styles.videoCard}`}>
              <VideoCard videoId={videoId} />
            </li>
          ))
        ) : (
          <div>
            <h3>Nothing Here </h3>
            <div className="button-container">
              <div>
                <Link to="/" className={`${styles.link} btn btn-primary`}>
                  Explore videos
                </Link>
              </div>
            </div>
          </div>
        )}
      </ul>
    </div>
  ) : (
    <Loader />
  );
};
