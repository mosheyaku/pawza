import { createLazyFileRoute, Navigate } from '@tanstack/react-router';

import { useAuth } from '../features/Auth/useAuth';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/home" replace />;
  }

  return <Navigate to="/login" replace />;
}
