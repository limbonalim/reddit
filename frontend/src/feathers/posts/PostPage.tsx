import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants.ts';
import FormatDate from '../../components/UI/FormatDate/FormatDate.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCurrentPost } from './postsSlice.ts';
import { getPost } from './postsThunks.ts';
import { selectUser } from '../users/usersSlice.ts';

const PostPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCurrentPost);
  const user = useAppSelector(selectUser);
  const photo = post?.image?  (<img src={BASE_URL + '/' + post.image} alt={post.title}/>) : null;

  useEffect(() => {
    if (id) {
      dispatch(getPost(id))
    }
  }, [id, dispatch]);

  return post && (
    <Box>
      <Box sx={{mb: 2}}>{photo}</Box>
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Typography variant='h3'>{post.title}</Typography>
          <Typography sx={{flexGrow: 1}}>{post.description}</Typography>
          <Box>
            <Typography>{post.author.username}</Typography>
            <Typography color='gray'>{new FormatDate(post.createdAt).getFormatDate()}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;