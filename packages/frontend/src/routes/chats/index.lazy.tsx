import { createLazyFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import ChatMenu from '../../features/Chat/ChatMenu';

function Index() {
  return <ChatMenu />;
}

export const Route = createLazyFileRoute('/chats/')({
  component: AuthenticatedRoute(Index),
});
