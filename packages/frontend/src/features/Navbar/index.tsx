import { AppBar, Toolbar, Typography } from '@mui/material';
import PawzaLogo from '@src/assets/pawza.png';

const Navbar = () => (
  <AppBar position="static" sx={{ height: '4rem', background: 'linear-gradient(to right, #DA9407, #ECB16B)' }}>
    <Toolbar sx={{ height: '4rem' }}>
      {/* Image and Text on the Left */}
      <img src={PawzaLogo} alt="logo" style={{ height: '100%', padding: '0.5rem', boxSizing: 'border-box' }} />
      <Typography variant="h5" component="div" className="pacifico-regular" sx={{ flexGrow: 1, textAlign: 'start' }}>
        Pawza
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Navbar;
