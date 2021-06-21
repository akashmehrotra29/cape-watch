import { Link } from "react-router-dom";
import { VideoBriefCard } from "../VideoBriefCard/VideoBriefCard";
import styles from "./PlaylistBrief.module.css";

export const PlaylistBrief = ({ playlist }) => {
  return (
    <div>
      <div className="horizontal-card-center">
        <div className="horizontal-card">
          <Link to={`/playlists/${playlist._id}`} className={`${styles.link}`}>
            <div className="thumbnail">
              {playlist.videos.length !== 0 &&
                playlist.videos
                  .slice(-1)
                  .map((videoId) => (
                    <VideoBriefCard key={videoId} videoId={videoId} />
                  ))}{" "}
            </div>
            <div className="product-description">
              <h2>
                {playlist.name}{" "}
                {playlist.videos.length !== 0 && (
                  <span>( {playlist.videos.length} )</span>
                )}
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
