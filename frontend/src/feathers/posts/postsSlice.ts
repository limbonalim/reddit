import { createSlice } from '@reduxjs/toolkit';
import { IMyError, IPost, IValidationError } from '../../types';
import { createPost, getPost, getPosts } from './postsThunks.ts';
import { RootState } from '../../app/store.ts';

interface PostsState {
  posts: IPost[];
  isLoading: boolean;
  error: IMyError | null;
  currentPost: IPost | null;
  isLoadingCurrentPost: boolean;
  currentPostError: IMyError | null;
  isLoadingCreatePost: boolean;
  createPostError: IValidationError | null;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
  currentPost: null,
  isLoadingCurrentPost: false,
  currentPostError: null,
  isLoadingCreatePost: false,
  createPostError: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPosts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }).addCase(getPosts.fulfilled, (state, {payload: posts}) => {
      state.isLoading = false;
      state.posts = posts;
    }).addCase(getPosts.rejected, (state, {payload: error}) => {
      state.isLoading = false;
      state.error = error || null;
    });

    builder.addCase(getPost.pending, (state) => {
      state.isLoadingCurrentPost = true;
      state.currentPostError = null;
    }).addCase(getPost.fulfilled, (state, {payload: post}) => {
      state.isLoadingCurrentPost = false;
      state.currentPost = post;
    }).addCase(getPost.rejected, (state, {payload: error}) => {
      state.isLoadingCurrentPost = false;
      state.currentPostError = error || null;
    });

    builder.addCase(createPost.pending, (state) => {
      state.isLoadingCreatePost = true;
      state.createPostError = null;
    }).addCase(createPost.fulfilled, (state) => {
      state.isLoadingCreatePost = false;
    }).addCase(createPost.rejected, (state, {payload: error}) => {
      state.isLoadingCreatePost = false;
      state.createPostError = error || null;
    });
  }
});

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectIsLoading = (state: RootState) => state.posts.isLoading;
export const selectError = (state: RootState) => state.posts.error;
export const selectCurrentPost = (state: RootState) => state.posts.currentPost;
export const selectIsLoadingCurrentPost = (state: RootState) => state.posts.isLoadingCurrentPost;
export const selectCurrentPostError = (state: RootState) => state.posts.currentPostError;
export const selectIsLoadingCreatePost = (state: RootState) => state.posts.isLoadingCreatePost;
export const selectCreatePostError = (state: RootState) => state.posts.createPostError;

export const postsReducer = postsSlice.reducer;