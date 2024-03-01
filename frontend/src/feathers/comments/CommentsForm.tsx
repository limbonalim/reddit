import React, { useState } from 'react';
import { Alert, Box, Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { createComment, getComments } from './commentsThunks.ts';
import { selectCreateError, selectIsCreateLoading } from './commentsSlice.ts';


export interface ICommentForm {
  user: string;
  post: string;
  text: string;
}

interface Props {
  post: string;
  user: string;
}

const CommentsForm: React.FC<Props> = ({user, post}) => {
  const [comment, setComment] = useState<ICommentForm>({
    user: user,
    post: post,
    text: '',
  });
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsCreateLoading);
  const error = useAppSelector(selectCreateError);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target;
    setComment(prevState => ({
      ...prevState, [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createComment(comment)).unwrap();
    await dispatch(getComments(comment.post));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <TextField
            value={comment.text}
            onChange={handleChange}
            name="text"
            id="text"
            label="Enter your Comment"
            multiline
            rows={4}
            sx={{width: '65%'}}
          />
        </Grid>
        <Grid item>
          <Button type="submit" disabled={isLoading}>add comment</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommentsForm;