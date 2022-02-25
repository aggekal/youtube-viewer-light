import { useEffect } from "react";
import SearchBar from "./features/main/SearchBar";
import VideoDetail from "./features/main/VideoDetail";
import VideoList from "./features/main/VideoList";
import { Video } from "./features/main/VideoListItem";
import _ from "lodash";
import YTSearch from "youtube-api-search";
import { useAppDispatch } from "./app/hooks";
import {
  updateVideoList,
  updateSelectedVideo,
  emptyComments,
  updateNextPageToken,
} from "./features/main/videoSlice";
import Comments from "./features/main/Comments";

const App: React.FC = () => {
  const API_KEY = "AIzaSyB83MJ-3DsWtDrNb677ocYAFDGWINn12rY";
  const dispatch = useAppDispatch();

  useEffect(() => {
    videoSearch("liverpool");
  }, []);

  const videoSearch = (term: string) => {
    YTSearch({ key: API_KEY, term: term }, (videos: Video[]) => {
      dispatch(updateVideoList(videos));
      dispatch(emptyComments());
      dispatch(updateNextPageToken(""));
      dispatch(updateSelectedVideo(videos[0]));
    });
  };

  const handleTermChange = _.debounce((term: string) => {
    videoSearch(term);
  }, 300);

  return (
    <div className="flex flex-col font-body">
      <SearchBar onSearchTermChange={handleTermChange} />
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex flex-col mx-4 w-3/4 h-3/4">
          <VideoDetail />
          <Comments apiKey={API_KEY} />
        </div>
        <VideoList />
      </div>
    </div>
  );
};

export default App;
