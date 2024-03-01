import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import { createComment, getComments } from './commentsThunks.ts';


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
          <Button type="submit">add comment</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommentsForm;