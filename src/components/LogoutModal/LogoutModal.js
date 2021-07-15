import { useAuth, useVideos } from "../../contexts";
import styles from "./LogoutModal.module.css";

export const LogoutModal = ({ setShowLogoutModal }) => {
  const { logoutUser } = useAuth();
  const { dispatch } = useVideos();

  return (
    <div className={`${styles.modalOuter}`}>
      <div className={`${styles.modalInner}`}>
        <h2>Are you sure you want to logout</h2>
        <div className={`${styles.modalButtonWrap}`}>
          <button
            className="btn btn-secondary"
            onClick={() => setShowLogoutModal(false)}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              logoutUser();
              dispatch({ type: "RESET_PLAYLISTS" });
              setShowLogoutModal(false);
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
