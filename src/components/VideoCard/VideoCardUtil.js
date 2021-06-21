export const getVideoDetailsById = (videoId, videos) =>
  videos.find((video) => video._id === videoId);
