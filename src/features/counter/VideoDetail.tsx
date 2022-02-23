import { useAppSelector } from "../../app/hooks";
import { Video } from "./VideoListItem";
import { selectSelectedVideo } from "./videoSlice";

// interface VideoDetailProps {
//   video: Video | null;
// }

const VideoDetail: React.FC = () => {
  const video = useAppSelector(selectSelectedVideo);
  if (!video) {
    return <div>Loading...</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="flex flex-col border-gray-300 h-3/4">
      <div className="flex h-full w-full">
        <iframe
          title={video.snippet.title}
          className="flex h-full w-full"
          src={url}
        />
      </div>
      <div className="my-4">
        <div className="text-xl font-black">
          <html>{video.snippet.title}</html>
        </div>
        <div className="text-md font-extrabold">
          {video.snippet.description}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
