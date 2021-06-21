import { useVideos } from "../../contexts";
import { VideoCard } from "../../components";
export const Home = () => {
  const { videos } = useVideos();
  return (
    <div>
      <h1>Videos</h1>
      <div className="videolist">
        {videos.map((video) => {
          return <VideoCard key={video._id} videoId={video._id} />;
        })}
      </div>
    </div>
  );
};
