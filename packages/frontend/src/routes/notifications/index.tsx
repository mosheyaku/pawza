import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import NotificationsPage from '../../features/NotificationsPage';

function Index() {
  return <NotificationsPage />;
}

export const Route = createFileRoute('/notifications/')({
  component: AuthenticatedRoute(Index),
});
