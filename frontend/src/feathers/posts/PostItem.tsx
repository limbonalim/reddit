import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FormatDate from '../../components/UI/FormatDate/FormatDate.ts';
import Chat from '../../assets/Chat.png';
import { BASE_URL } from '../../constants.ts';
import type { IPost } from '../../types';

type Props = Omit<IPost, 'description'>;

const PostItem: React.FC<Props> = ({_id, title, image, author, createdAt}) => {
  const photo = image? BASE_URL + '/' + image : Chat;
  const path = `post/${_id}`;

  return (
    <Link to={path} component={RouterLink} sx={{textDecoration: 'none', color: 'inherit'}}>
      <Box sx={{display: 'flex', gap: 2, border: '2px solid blue', borderRadius: 2, padding: 1}}>
        <Box sx={{width: '25%'}}>
          <img src={photo} alt={title} style={{maxWidth: '100%', maxHeight: '100%', borderRadius: '15px'}}/>
        </Box>
        <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <Typography variant='h4'>{title}</Typography>
          <Box sx={{display: 'flex', gap: 1}}>
            <Typography>{author.username}</Typography>
            <Typography color='gray'>{new FormatDate(createdAt).getFormatDate()}</Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default PostItem;