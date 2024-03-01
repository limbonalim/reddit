import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';
import type { IMyError, IPost, IValidationError } from '../../types';
import { IFormPosts } from './PostsForm.tsx';

export const getPosts = createAsyncThunk<IPost[], void, {state: RootState, rejectValue: IMyError}>(
  'posts/getPosts',
  async (_, {getState, rejectWithValue}) => {
    try {
      const token = getState().users?.user?.token;
      if (token) {
        const response = await axiosApi.get<IPost[]>('/posts', {headers: {'Authorization': `Barer ${token}`}});
        return response.data;
      }

      const response = await axiosApi.get<IPost[]>('/posts');
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e
    }
  });

export const getPost = createAsyncThunk<IPost, string, {rejectValue: IMyError}>(
  'posts/getPost',
  async (id, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get<IPost>(`/posts/${id}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e
    }
  });

export const createPost = createAsyncThunk<void, IFormPosts, {state: RootState, rejectValue: IValidationError}>(
  'posts/createPost',
  async (data, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      const postData = new FormData();

      postData.append('title', data.title);
      if (data.image) {
        postData.append('image', data.image);
      }

      if (data.description) {
        postData.append('description', data.description);
      }

      await axiosApi.post('/posts', postData, {headers: {'Authorization': `Barer ${token}`}});
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

