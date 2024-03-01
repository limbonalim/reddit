import { useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { BASE_URL } from '../../constants.ts';
import FormatDate from '../../components/UI/FormatDate/FormatDate.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { selectCurrentPost } from './postsSlice.ts';
import { getPost } from './postsThunks.ts';
import { selectUser } from '../users/usersSlice.ts';
import CommentsForm from '../comments/CommentsForm.tsx';
import { getComments } from '../comments/commentsThunks.ts';
import { selectComments } from '../comments/commentsSlice.ts';
import CommentItem from '../comments/CommentItem.tsx';

const PostPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(selectCurrentPost);
  const user = useAppSelector(selectUser);
  const comments = useAppSelector(selectComments);
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

  const renderComments = comments.map(({_id, user, text}) => (
    <CommentItem key={_id} user={user} text={text}/>
  ));

  return post && (
    <Box>
      <Box sx={{mb: 2}}>{photo}</Box>
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 3}}>
          <Box>
            <Typography variant="h3">{post.title}</Typography>
            <Typography sx={{flexGrow: 1}}>{post.description}</Typography>
          </Box>
          <Box>
            <Typography>{post.author.username}</Typography>
            <Typography color="gray">{new FormatDate(post.createdAt).getFormatDate()}</Typography>
          </Box>
          {user && <CommentsForm user={user.token} post={post._id}/>}
          {renderComments}
        </Box>
      </Box>
    </Box>
  );
};

export default PostPage;