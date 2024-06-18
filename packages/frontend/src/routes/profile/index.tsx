import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import PopIn from '../../features/PopIn';
import ProfilePage from '../../features/ProfilePage';

function Index() {
  return (
    <PopIn>
      <ProfilePage />
    </PopIn>
  );
}
export const Route = createFileRoute('/profile/')({
  component: AuthenticatedRoute(Index),
  pendingComponent: FullScreenLoader,
});
