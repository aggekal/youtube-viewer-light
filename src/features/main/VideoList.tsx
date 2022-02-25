import { useAppSelector } from "../../app/hooks";
import VideoListItem from "./VideoListItem";
import { Video } from "./VideoListItem";
import { selectVideos } from "./videoSlice";

const VideoList: React.FC = () => {
  const videos = useAppSelector(selectVideos);
  const videoItems = videos.map((video: Video) => {
    return <VideoListItem key={video.etag} video={video} />;
  });

  return <ul className="w-full lg:w-1/4">{videoItems}</ul>;
};

export default VideoList;
