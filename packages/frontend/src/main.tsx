import './normalize.css';
import './index.scss';

import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import ReactDOM from 'react-dom/client';

import AuthProvider from './features/Auth/AuthProvider';
// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { theme } from './theme';

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    // auth will initially be null
    // We'll be passing down the auth state from within a React component
    user: null,
  },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </ThemeProvider>,
);
