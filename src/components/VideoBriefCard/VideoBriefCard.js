import { useVideos } from "../../contexts";

export const VideoBriefCard = ({ videoId }) => {
  const { videos } = useVideos();

  const video = videos.find((video) => video._id === videoId);

  return video ? (
    <img
      className="img-responsive-horizontal"
      src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
      alt=""
    />
  ) : (
    <></>
  );
};
