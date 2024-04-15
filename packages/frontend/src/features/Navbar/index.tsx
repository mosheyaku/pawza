import {
  AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import PawzaLogo from '@src/assets/pawza.png';
import { useState } from 'react';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" sx={{ height: '4rem', background: 'linear-gradient(to right, #DA9407, #ECB16B)' }}>
      <Toolbar sx={{ height: '4rem' }}>
        {/* Image and Text on the Left */}
        <img src={PawzaLogo} alt="logo" style={{ height: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
        <Typography variant="h5" component="div" className="pacifico-regular" sx={{ flexGrow: 1, textAlign: 'start' }}>
          Pawza
        </Typography>

        {/* Icons */}
        <Hidden mdUp>
          {/* Notifications Icon for Small Screen */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Hidden>

        <Hidden smDown>
          {/* Notifications Icon, Messages Icon, Profile Icon for Large Screen */}
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <Badge badgeContent={2} color="error">
              <MessageIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Hidden>

        {/* Drawer for Small Screen */}
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerToggle}>
            <List>
              <ListItem button>
                <ListItemIcon>
                  <NotificationsIcon />
                </ListItemIcon>
                <ListItemText primary="Notifications" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <MessageIcon />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
            </List>
          </Drawer>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
