import { Link } from "react-router-dom";
import { useVideos } from "../../contexts";
import { getVideoDetailsById } from "./VideoCardUtil";
import styles from "./VideoCard.module.css";

export const VideoCard = ({ videoId }) => {
  const { videos } = useVideos();

  const { id, thumbnailURL, channelName, publishedDate, title, viewCount } =
    getVideoDetailsById(videoId, videos);

  return (
    <Link className={`${styles.link}`} to={`/video/${id}`}>
      <div className="video-item">
        <img alt="" src={thumbnailURL} className={`styles.cardThumbnail`} />
        <div className="video-desc">
          <h4>{title}</h4>
          <div>
            <p id="channel-title">{channelName}</p>
            <div className="video-views">
              <p>{viewCount} views</p>
              <p>{publishedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
