import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import axiosApi from '../../axiosApi.ts';
import type { ICommentForm } from './CommentsForm.tsx';
import type { IMyError, IComment, IValidationError } from '../../types';

export const getComments = createAsyncThunk<IComment[], string, { rejectValue: IMyError }>(
  'comments/getComments',
  async (post, {rejectWithValue}) => {
    try {
      const response = await axiosApi.get(`/comments/${post}`);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 404) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);

export const createComment = createAsyncThunk<void, ICommentForm, { rejectValue: IValidationError }>(
  'comments/createComment',
  async (data, {rejectWithValue}) => {
    try {
      await axiosApi.post(`comments/${data.post}`, {text: data.text}, {headers: {'Authorization': `Barer ${data.user}`}});
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 422) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  }
);