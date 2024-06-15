import LogoutIcon from '@mui/icons-material/Logout';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import PawzaLogo from '@src/assets/pawza.png';

import { resetApiClientTokens } from '../../api/base';
import { useAuth } from '../Auth/useAuth';

const Navbar = () => {
  const { setUser, user } = useAuth();

  const logout = () => {
    setUser(null);
    resetApiClientTokens();
  };

  return (
    <AppBar
      position="static"
      sx={{ height: '4rem', background: 'linear-gradient(to right, #DA9407, #ECB16B)', boxShadow: 'none' }}
    >
      <Toolbar sx={{ height: '4rem', display: 'flex', justifyContent: 'space-between' }}>
        {/* Image and Text on the Left */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={PawzaLogo} alt="logo" style={{ height: '64px', padding: '0.5rem', boxSizing: 'border-box' }} />
          <Typography
            variant="h5"
            component="div"
            className="pacifico-regular"
            sx={{ flexGrow: 1, textAlign: 'start' }}
          >
            Pawza
          </Typography>
        </div>
        {/* Logout Icon on the Right */}
        {user && (
          <IconButton color="inherit" onClick={logout}>
            <LogoutIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
