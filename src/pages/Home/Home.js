import { useVideos } from "../../contexts";
import { VideoCard } from "../../components";
export const Home = () => {
  const { videos } = useVideos();
  return (
    <div>
      <h1>Videos</h1>
      <div className="videolist">
        {videos.map((video) => {
          return <VideoCard key={video.id} videoId={video.id} />;
        })}
      </div>
    </div>
  );
};
