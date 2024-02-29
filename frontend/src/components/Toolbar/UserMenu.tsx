import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useAppDispatch } from '../../app/hooks.ts';
import { logout } from '../../feathers/users/usersThunks.ts';
import type { IUser } from '../../types';


interface Props {
  user: IUser;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const dispatch = useAppDispatch();

  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button color="inherit" onClick={onClick}>
        Hello, {user.username}!
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={onClose} keepMounted>
        <MenuItem onClick={() => dispatch(logout())}>LogOut</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;