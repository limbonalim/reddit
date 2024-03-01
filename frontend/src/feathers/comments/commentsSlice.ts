import { createSlice } from '@reduxjs/toolkit';
import { createComment, getComments } from './commentsThunks.ts';
import { RootState } from '../../app/store.ts';
import { IComment, IMyError, IValidationError } from '../../types';

interface ICommentsState {
  comments: IComment[];
  isLoading: boolean;
  error: IMyError | null;
  isCreateLoading: boolean;
  createError: IValidationError | null;
}

const initialState: ICommentsState = {
  comments: [],
  isLoading: false,
  error: null,
  isCreateLoading: false,
  createError: null
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getComments.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(getComments.fulfilled, (state, {payload: comments}) => {
      state.isLoading = false;
      state.comments = comments;
    }).addCase(getComments.rejected, (state, {payload: error}) => {
      state.isLoading = false;
      state.error = error || null;
    });

    builder.addCase(createComment.pending, (state) => {
      state.isCreateLoading = true;
      state.createError = null;
    }).addCase(createComment.fulfilled, (state) => {
      state.isCreateLoading = false;
    }).addCase(createComment.rejected, (state, {payload: error}) => {
      state.isCreateLoading = false;
      state.createError = error || null;
    });
  }
});

export const selectComments = (state: RootState) => state.comments.comments;
export const selectIsLoading = (state: RootState) => state.comments.isLoading;
export const selectError = (state: RootState) => state.comments.error;
export const selectIsCreateLoading = (state: RootState) => state.comments.isCreateLoading;
export const selectCreateError = (state: RootState) => state.comments.createError;

export const commentsReducer = commentsSlice.reducer;