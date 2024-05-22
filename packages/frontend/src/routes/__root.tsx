import { Box } from '@mui/material';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import Footer from '../features/Footer';
import MeFetcher from '../features/MeFetcher';
import Navbar from '../features/Navbar';

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <Box component="main" flexGrow={1} maxWidth="400px" alignSelf="center" sx={{ overflowY: 'auto' }}>
        <MeFetcher>
          <Outlet />
        </MeFetcher>
      </Box>
      <TanStackRouterDevtools />

      <Footer />
    </>
  ),
});
