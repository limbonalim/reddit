import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Grid, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import FileInput from '../../components/UI/FileInput/FileInput.tsx';
import { selectUser } from '../users/usersSlice.ts';
import { createPost, getPosts } from './postsThunks.ts';
import { selectCreatePostError, selectIsLoadingCreatePost } from './postsSlice.ts';


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
  const isLoading = useAppSelector(selectIsLoadingCreatePost);
  const error = useAppSelector(selectCreatePostError);
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
      {error && <Alert severity="error">{error.message}</Alert>}
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
          <IconButton type="submit" disabled={isLoading} aria-label="add post" size="large" color='inherit'>
            Add Post
            <AddIcon fontSize="inherit"/>
          </IconButton>
        </Grid>
      </Grid>
    </form>
  );
};

export default PostsForm;