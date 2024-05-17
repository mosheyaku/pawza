import { createLazyFileRoute } from '@tanstack/react-router';

import LoginPage from '../../features/LoginPage';

function Index() {
  return <LoginPage />;
}

export const Route = createLazyFileRoute('/login/')({
  component: Index,
});
