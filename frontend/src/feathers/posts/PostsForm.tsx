import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { selectUser } from '../users/usersSlice.ts';
import { createPost, getPosts } from './postsThunks.ts';

export interface IFormPosts {
  title: string;
  description: string;
  image: File | null;
}

const PostsForm = () => {
  const [post, setPost] = useState<IFormPosts>({
    title: '',
    description: '',
    image: null,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, dispatch]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setPost((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onChangeFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({
      ...prev,
      image: e.target.files ? e.target.files[0] : null
    }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await dispatch(createPost(post)).unwrap();
    await dispatch(getPosts());
    navigate('/');
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid container item direction="column" spacing={2}>
        <Grid item>
          <TextField
            sx={{
              width: '50%'
            }}
            label="Title"
            name="title"
            onChange={onChange}
            value={post.title}
            required
          />
        </Grid>
        <Grid item>
          <TextField
            sx={{
              width: '50%'
            }}
            onChange={onChange}
            value={post.description}
            multiline
            rows={3}
            name="description"
            label="Description"
          />
        </Grid>
        <Grid item>
          <FileInput
            name="image"
            onChange={onChangeFileInput}
            label="Imeage"
          />
        </Grid>
        <Grid item>
          <Button type="submit">Add</Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostsForm;