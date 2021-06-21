import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { useVideos } from "../../contexts/videos-context";
import { PlaylistBrief, VideoActionButtons } from "../../components";
import { addToHistory } from "./VideoDetailsUtil";
import styles from "./VideoDetails.module.css";
import { useAuth } from "../../contexts";
import { Loader } from "../../components";

export const VideoDetails = () => {
  const { videos, playlists, dispatch } = useVideos();
  const { videoId } = useParams();
  const { user } = useAuth();

  const video = videos.find((video) => video.id === videoId);
  const watchedVideosPlaylist = playlists.find(
    (playlist) => playlist.name === "Watched Videos"
  );

  const isUserDataLoaded = user
    ? videos.length && playlists.length
    : videos.length;

  return isUserDataLoaded ? (
    <div>
      {video && (
        <div className={`${styles.container}`}>
          <div className={`${styles.reactPlayer}`}>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${video.id}`}
              width="100%"
              height="100%"
              controls
              pip
              onPlay={() =>
                addToHistory(watchedVideosPlaylist._id, video, dispatch)
              }
            />
          </div>

          <div className={`${styles.channelDetailsContainer}`}>
            <div className={`${styles.contentGrid}`}>
              <div className={`${styles.flexLeft}`}>
                <div>
                  <img
                    className={`${styles.avatarImage}`}
                    src={video.channelImageURL}
                    alt=""
                  />
                </div>
                <div>
                  <h3 className={`${styles.channelName}`}>
                    {video.channelName}
                  </h3>
                  <p className={`${styles.subs}`}>25K subscribers</p>
                </div>
                <h2 className={`${styles.title}`}>{video.title}</h2>
                <p className={`${styles.description}`}>{video.description}</p>
                <VideoActionButtons video={video} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};
