import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { Video } from './VideoListItem';


export interface VideosState {
  value: Video[];
  selectedVideo:Video | null;
}

const initialState: VideosState = {
  value: [],
  selectedVideo: null
};

export const videosSlice = createSlice({
       name: 'videos',
       initialState,
       reducers: {
         increment: (state) => {
           state.value += 1;
         },
         decrement: (state) => {
           state.value -= 1;
         },
         incrementByAmount: (state, action: PayloadAction<number>) => {
           state.value += action.payload;
         },
       }
     });