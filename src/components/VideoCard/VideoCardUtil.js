export const getVideoDetailsById = (videoId, videos) =>
  videos.find((video) => video.id === videoId);
