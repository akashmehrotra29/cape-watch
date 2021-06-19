import { useNavigate } from "react-router-dom";
import { useVideos } from "../../contexts";
import { deletePlaylist, findIsDefaultPlaylist } from "./DeleteModalUtil";
import styles from "./DeleteModal.module.css";

export const DeleteModal = ({ setshowDeleteModal, playlistId }) => {
  const { dispatch } = useVideos();
  const navigate = useNavigate();

  const isDefaultPlaylist = findIsDefaultPlaylist(playlistId);

  const modalTitle = "Are you sure?";
  const modalText = isDefaultPlaylist
    ? "This will delete all your videos from this playlist."
    : "This action will delete whole playlist.";

  return (
    <div className={`${styles.modalOuter}`}>
      <div className={`${styles.modalInner}`}>
        <h2>{modalTitle}</h2>
        <p>{modalText}</p>
        <div className={`${styles.modalButtonWrap}`}>
          <button
            onClick={() => setshowDeleteModal(false)}
            className="btn btn-outlined btn-small"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              deletePlaylist(navigate, dispatch, playlistId, setshowDeleteModal)
            }
            className="btn btn-solid btn-small"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
