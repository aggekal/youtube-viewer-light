import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { CommentThread } from './Comments';
import { Video } from './VideoListItem';


export interface VideosState {
  value: Video[];
  nextPage: string;
  selectedVideo:Video | null;
  comments: CommentThread[];
}

const initialState: VideosState = {
  value: [],
  nextPage: "",
  selectedVideo: null,
  comments: []
};

export const videoSlice = createSlice({
       name: 'video',
       initialState,
       reducers: {
       updateVideoList : (state, action: PayloadAction<Video[]>) => {
              state.value = action.payload
       },
       updateSelectedVideo: (state, action: PayloadAction<Video>) => {
              state.selectedVideo = action.payload;
              updateNextPageToken(initialState.nextPage);
       },
       updateNextPageToken : (state, action: PayloadAction<string>) => {
        state.nextPage = action.payload
      },
      updateComments: (state, action: PayloadAction<CommentThread[]>) => {
        state.comments = action.payload
      },
      emptyComments:(state) => {
        state.comments = initialState.comments;
      }
     }
});

export const { updateVideoList,updateSelectedVideo,updateNextPageToken,updateComments,emptyComments } = videoSlice.actions;
export const selectVideos = (state: RootState) => state.video.value;
export const selectSelectedVideo = (state: RootState) => state.video.selectedVideo;
export const selectPageToken = (state: RootState) => state.video.nextPage;
export const selectComments = (state: RootState) => state.video.comments;
export default videoSlice.reducer;