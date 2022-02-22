//import { Counter } from './features/counter/Counter';
import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./features/counter/SearchBar";
import VideoDetail from "./features/counter/VideoDetail";
import VideoList from "./features/counter/VideoList";
import { Video } from "./features/counter/VideoListItem";
import _ from "lodash";
import YTSearch from "youtube-api-search";

const App: React.FC = () => {
  const API_KEY = "AIzaSyCbcQMTPqAevOao2BQsQadm5SFTZljP2dM";
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    videoSearch("liverpool");
  }, []);

  const videoSearch = (term: string) => {
    YTSearch({ key: API_KEY, term: term }, (videos: Video[]) => {
      console.log("videos", videos);
      setVideos(videos);
      setSelectedVideo(videos[0]);
    });
  };

  const handleTermChange = _.debounce((term: string) => {
    videoSearch(term);
  }, 300);

  return (
    <div className="App">
      <SearchBar onSearchTermChange={handleTermChange} />
      <VideoDetail video={selectedVideo} />
      <VideoList
        videos={videos}
        onVideoSelect={(selectedVideo) => setSelectedVideo(selectedVideo)}
      />
    </div>
  );
};

export default App;
