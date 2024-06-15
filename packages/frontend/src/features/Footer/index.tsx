import {
  Home as HomeIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { AppBar, Badge, IconButton, Toolbar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

import { getUnreadNotificationsCount } from '../../api/notifications';
import { useAuth } from '../Auth/useAuth';

const Footer = () => {
  const { user } = useAuth();
  const { data: unreadNotificationsCount } = useQuery({
    queryKey: ['unreadNotificationsCount'],
    queryFn: getUnreadNotificationsCount,
    enabled: !!user,
  });

  return (
    <AppBar component="footer" position="sticky" sx={{ height: '4rem', background: '#DA940719', boxShadow: 'none' }}>
      <Toolbar
        sx={{
          height: '4rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          fontSize: '2rem',
        }}
      >
        {!!user && (
          <>
            <Link to="/home">
              <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
                <HomeIcon fontSize="inherit" sx={{ color: '#000' }} />
              </IconButton>
            </Link>

            <Link to="/notifications">
              <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
                {unreadNotificationsCount?.data ? (
                  <Badge badgeContent={unreadNotificationsCount.data} color="error">
                    <NotificationsIcon fontSize="inherit" sx={{ color: '#000' }} />
                  </Badge>
                ) : (
                  <NotificationsIcon fontSize="inherit" sx={{ color: '#000' }} />
                )}
              </IconButton>
            </Link>

            <Link to="/chats">
              <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
                {/* <Badge badgeContent={2} color="error"> */}
                <MessageIcon fontSize="inherit" sx={{ color: '#000' }} />
                {/* </Badge> */}
              </IconButton>
            </Link>

            <Link to="/profile">
              <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
                <PersonIcon fontSize="inherit" sx={{ color: '#000' }} />
              </IconButton>
            </Link>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
