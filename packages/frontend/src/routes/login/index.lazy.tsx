import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useAuth } from '../../features/Auth/useAuth';
import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import LoginPage from '../../features/LoginPage';

function Index() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" />;
  }

  return <LoginPage />;
}

export const Route = createLazyFileRoute('/login/')({
  component: Index,
  pendingComponent: FullScreenLoader,
});
