import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { Video } from './VideoListItem';


export interface VideosState {
  value: Video[];
  selectedVideo:Video | null;
}

const initialState: VideosState = {
  value: [],
  selectedVideo: null
};

export const videoSlice = createSlice({
       name: 'video',
       initialState,
       reducers: {
       updateVideoList : (state, action: PayloadAction<Video[]>) => {
              state.value = action.payload
       },
       updateSelectedVideo: (state, action: PayloadAction<Video>) => {
              state.selectedVideo = action.payload
       }
     }
});

export const { updateVideoList,updateSelectedVideo } = videoSlice.actions;
export const selectVideos = (state: RootState) => state.video.value;
export const selectSelectedVideo = (state: RootState) => state.video.selectedVideo;
export default videoSlice.reducer;