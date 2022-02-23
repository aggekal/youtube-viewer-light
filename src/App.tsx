//import { Counter } from './features/counter/Counter';
import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./features/counter/SearchBar";
import VideoDetail from "./features/counter/VideoDetail";
import VideoList from "./features/counter/VideoList";
import { Video } from "./features/counter/VideoListItem";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import { useAppDispatch } from "./app/hooks";
import {
  updateVideoList,
  updateSelectedVideo,
} from "./features/counter/videoSlice";
import Comments from "./features/counter/Comments";

const App: React.FC = () => {
  const API_KEY = "AIzaSyCbcQMTPqAevOao2BQsQadm5SFTZljP2dM";
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    videoSearch("liverpool");
  }, []);

  const videoSearch = (term: string) => {
    YTSearch({ key: API_KEY, term: term }, (videos: Video[]) => {
      // setVideos(videos);
      // setSelectedVideo(videos[0]);
      dispatch(updateVideoList(videos));
      dispatch(updateSelectedVideo(videos[0]));
    });
  };

  const handleTermChange = _.debounce((term: string) => {
    videoSearch(term);
  }, 300);

  return (
    <div className="flex flex-col font-body h-screen">
      <SearchBar onSearchTermChange={handleTermChange} />
      <div className="flex flex-row">
        <div className="flex flex-col mx-4">
          <VideoDetail />
          <Comments apiKey={API_KEY} />
        </div>
        <VideoList
        // videos={videos}
        // onVideoSelect={(selectedVideo) => setSelectedVideo(selectedVideo)}
        />
      </div>
    </div>
  );
};

export default App;
