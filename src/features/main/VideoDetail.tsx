import { useAppSelector } from "../../app/hooks";
import Spinner from "../../utils/Spinner";
import { selectSelectedVideo } from "./videoSlice";

const VideoDetail: React.FC = () => {
  const video = useAppSelector(selectSelectedVideo);
  if (!video) {
    return <Spinner />;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="flex flex-col border-gray-300 h-2/4">
      <div className="h-full w-full">
        <iframe
          title={video.snippet.title}
          className="w-full h-full aspect-video"
          src={url}
        />
      </div>
      <div className="my-4 border-y border-gray-300">
        <div className="text-xl font-black">
          <div>{video.snippet.title}</div>
        </div>
        <div className="text-md font-extrabold">
          {video.snippet.description}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
