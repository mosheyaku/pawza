import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import ProfilePage from '../../features/ProfilePage';

function Index() {
  return <ProfilePage />;
}
export const Route = createFileRoute('/profile/')({
  component: AuthenticatedRoute(Index),
  pendingComponent: FullScreenLoader,
});
