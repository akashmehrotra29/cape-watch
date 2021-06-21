import { PlaylistBrief } from "../../components/PlaylistBrief/PlaylistBrief";
import { useVideos } from "../../contexts";
import styles from "./Playlists.module.css";

export const Playlists = () => {
  const { playlists } = useVideos();
  return (
    <div>
      <h1> Playlists </h1>
      {playlists &&
        playlists.map((playlist) => (
          <div key={playlist._id}>
            <div className={`${styles.height2R}`}></div>
            <PlaylistBrief playlist={playlist} />
          </div>
        ))}
    </div>
  );
};
