import { Box, Typography } from '@mui/material';
import React from 'react';
import type { IComment } from '../../types';

type Props = Omit<IComment, '_id'>;


const CommentItem: React.FC<Props> = ({text, user}) => {
  return (
    <Box sx={{border: '1px solid blue', borderRadius: 1, padding: 1}}>
      <Typography>{text}</Typography>
      <Typography color="gray">{user.username}</Typography>
    </Box>
  );
};

export default CommentItem;