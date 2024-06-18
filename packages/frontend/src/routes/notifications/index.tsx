import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import NotificationsPage from '../../features/NotificationsPage';
import PopIn from '../../features/PopIn';

function Index() {
  return (
    <PopIn>
      <NotificationsPage />
    </PopIn>
  );
}

export const Route = createFileRoute('/notifications/')({
  component: AuthenticatedRoute(Index),
});
