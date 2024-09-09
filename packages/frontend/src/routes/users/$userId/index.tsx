import { createFileRoute, useParams } from '@tanstack/react-router';

import AuthenticatedRoute from '../../../features/AuthenticatedRoute';
import FullScreenLoader from '../../../features/Loader/FullScreenLoader';
import UserPage from '../../../features/UserPage';

function Index() {
  const userId = useParams({
    from: '/users/$userId/',
    select: (params) => params.userId,
  });

  if (!userId) {
    return <div>Error: UserId is missing</div>;
  }

  return <UserPage userId={userId} />;
}

const AuthenticatedIndex = AuthenticatedRoute(Index);

export const Route = createFileRoute('/users/$userId/')({
  component: AuthenticatedIndex,
  pendingComponent: FullScreenLoader,
});
