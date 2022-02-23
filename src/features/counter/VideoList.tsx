import { useAppSelector } from "../../app/hooks";
import VideoListItem from "./VideoListItem";
import { Video } from "./VideoListItem";
import { selectVideos } from "./videoSlice";

// interface VideoListProps {
//   videos: Video[];
//   onVideoSelect: (video: Video) => void;
// }

const VideoList: React.FC = () => {
  const videos = useAppSelector(selectVideos);
  const videoItems = videos.map((video: Video) => {
    return (
      <VideoListItem
        //    onVideoSelect={onVideoSelect}
        key={video.etag}
        video={video}
      />
    );
  });

  return <ul className="col-md-4 list-group">{videoItems}</ul>;
};

export default VideoList;
