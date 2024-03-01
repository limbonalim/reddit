import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectPosts } from './postsSlice.ts';
import { useEffect } from 'react';
import { getPosts } from './postsThunks.ts';
import PostItem from './PostItem.tsx';

const PostsPage = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const render = posts.map(({_id, title, description, image, createdAt, author}) => (
    <PostItem key={_id} _id={_id} title={title} description={description} image={image} createdAt={createdAt} author={author}/>
  ));

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 2, }}>
      {render}
    </Box>
  );
};

export default PostsPage;