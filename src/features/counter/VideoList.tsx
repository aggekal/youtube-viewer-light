import VideoListItem from "./VideoListItem";
import { Video } from "./VideoListItem";

interface VideoListProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

const VideoList: React.FC<VideoListProps> = ({ onVideoSelect, videos }) => {
  const videoItems = videos.map((video: Video) => {
    return (
      <VideoListItem
        onVideoSelect={onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });

  return <ul className="col-md-4 list-group">{videoItems}</ul>;
};

export default VideoList;
