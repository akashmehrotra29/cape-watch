export const VideoBriefCard = ({ playlistId }) => {
  return (
    <img
      className="img-responsive-horizontal"
      src={`https://img.youtube.com/vi/${playlistId}/default.jpg`}
      alt=""
    />
  );
};
