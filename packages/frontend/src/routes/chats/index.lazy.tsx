import { createLazyFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import ChatsPage from '../../features/ChatsPage';
import FullScreenLoader from '../../features/Loader/FullScreenLoader';

function Index() {
  return <ChatsPage />;
}

export const Route = createLazyFileRoute('/chats/')({
  component: AuthenticatedRoute(Index),
  pendingComponent: FullScreenLoader,
});
