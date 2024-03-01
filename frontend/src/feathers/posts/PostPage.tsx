import { useEffect } from 'react';
import { Typography, Box, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants.ts';
import FormatDate from '../../components/UI/FormatDate/FormatDate.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCurrentPost, selectCurrentPostError, selectIsLoadingCurrentPost } from './postsSlice.ts';
import { getPost } from './postsThunks.ts';
import { selectUser } from '../users/usersSlice.ts';
import CommentsForm from '../comments/CommentsForm.tsx';
import { getComments } from '../comments/commentsThunks.ts';
import { selectComments, selectError, selectIsLoading } from '../comments/commentsSlice.ts';
import CommentItem from '../comments/CommentItem.tsx';
import Loader from '../../components/UI/Loader/Loader.tsx';

const PostPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCurrentPost);
  const user = useAppSelector(selectUser);
  const comments = useAppSelector(selectComments);
  const isCommentsLoading = useAppSelector(selectIsLoading);
  const commentsError = useAppSelector(selectError);
  const isLoading = useAppSelector(selectIsLoadingCurrentPost);
  const error = useAppSelector(selectCurrentPostError);
  const photo = post?.image ? (<img src={BASE_URL + '/' + post.image} alt={post.title}/>) : null;

  const renderPage = async () => {
    if (id) {
      await dispatch(getPost(id)).unwrap();
      await dispatch(getComments(id));
    }
  };

  useEffect(() => {
    void renderPage();
  }, [id, dispatch]);

  const date = post?.createdAt || new Date();

  const renderComments = comments.map(({_id, user, text}) => (
    <CommentItem key={_id} user={user} text={text}/>
  ));

  return isLoading ? <Loader/> : (
    <Box>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Box sx={{mb: 2}}>{photo}</Box>
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3}}>
          <Box>
            <Typography variant="h3">{post?.title}</Typography>
            <Typography sx={{flexGrow: 1}}>{post?.description}</Typography>
          </Box>
          <Box>
            <Typography>{post?.author.username}</Typography>
            <Typography color="gray">{new FormatDate(date).getFormatDate()}</Typography>
          </Box>
          {user && <CommentsForm user={user.token} post={post?._id ? post._id : ''}/>}
          {commentsError && <Alert severity="warning">{commentsError.message}</Alert>}
          {isCommentsLoading ? <Loader/> : renderComments}
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;