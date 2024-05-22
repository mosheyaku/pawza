import {
  Home as HomeIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { AppBar, Badge, IconButton, Toolbar } from '@mui/material';

const Footer = () => (
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
      <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
        <HomeIcon fontSize="inherit" />
      </IconButton>

      <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
        <Badge badgeContent={1} color="error">
          <NotificationsIcon fontSize="inherit" />
        </Badge>
      </IconButton>

      <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
        <Badge badgeContent={2} color="error">
          <MessageIcon fontSize="inherit" />
        </Badge>
      </IconButton>

      <IconButton color="inherit" sx={{ fontSize: 'inherit' }}>
        <PersonIcon fontSize="inherit" />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Footer;
