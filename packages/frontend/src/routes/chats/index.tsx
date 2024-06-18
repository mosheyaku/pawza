import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import ChatsPage from '../../features/ChatsPage';
import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import PopIn from '../../features/PopIn';

function Index() {
  return (
    <PopIn>
      <ChatsPage />
    </PopIn>
  );
}

export const Route = createFileRoute('/chats/')({
  component: AuthenticatedRoute(Index),
  pendingComponent: FullScreenLoader,
});
