import { Box } from '@mui/material';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import Footer from '../features/Footer';
import MeFetcher from '../features/MeFetcher';
import Navbar from '../features/Navbar';

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Box component="main" flexGrow={1} width="100vw" maxWidth="640px" alignSelf="center" sx={{ overflowY: 'auto' }}>
        <MeFetcher>
          <Outlet />
        </MeFetcher>
      </Box>

      <Footer />
    </>
  ),
});
