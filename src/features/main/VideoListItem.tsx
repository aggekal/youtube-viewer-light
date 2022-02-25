import { useAppDispatch } from "../../app/hooks";
import {
  emptyComments,
  updateNextPageToken,
  updateSelectedVideo,
} from "./videoSlice";

export type Video = {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
    channelId: string;
    playlistId: string;
  };
  snippet: {
    publishedAt: Date;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
  };
};

interface VideListItemProps {
  video: Video;
}
const VideoListItem: React.FC<VideListItemProps> = ({ video }) => {
  const imageUrl = video.snippet.thumbnails.default.url;
  const dispatch = useAppDispatch();
  return (
    <li
      onClick={() => {
        dispatch(emptyComments());
        dispatch(updateSelectedVideo(video));
        dispatch(updateNextPageToken(""));
      }}
      className="hover:bg-slate-100"
    >
      <div className="flex w-full mb-2 cursor-pointer">
        <div className="w-1/2 mr-2">
          <img alt="video thumbnail" className="w-full h-full" src={imageUrl} />
        </div>
        <div className="w-1/2 font-black">
          <p>{video.snippet.title}</p>
        </div>
      </div>
    </li>
  );
};

export default VideoListItem;
