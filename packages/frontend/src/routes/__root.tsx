import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import Footer from '../features/Footer';
import Navbar from '../features/Navbar';

export const Route = createRootRoute({
  component: () => (
    <>
      <Navbar />
      <main style={{ flexGrow: 1, maxWidth: '400px', alignSelf: 'center' }}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />

      <Footer />
    </>
  ),
});
