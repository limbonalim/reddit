import { Box, Alert } from '@mui/material';
import { useEffect } from 'react';
import Loader from '../../components/UI/Loader/Loader.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectError, selectIsLoading, selectPosts } from './postsSlice.ts';
import { getPosts } from './postsThunks.ts';
import PostItem from './PostItem.tsx';
import { selectUser } from '../users/usersSlice.ts';

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch, user]);

  const render = posts.map(({_id, title, description, image, createdAt, author}) => (
    <PostItem key={_id} _id={_id} title={title} description={description} image={image} createdAt={createdAt}
              author={author}/>
  ));

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2,}}>
      {error && <Alert severity="error">{error.message}</Alert>}
      {isLoading ? <Loader/> : render}
    </Box>
  );
};

export default PostsPage;