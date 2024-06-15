import { createLazyFileRoute, useParams } from '@tanstack/react-router';

import AuthenticatedRoute from '../../../features/AuthenticatedRoute';
import ChatPage from '../../../features/ChatsPage/ChatPage';
import FullScreenLoader from '../../../features/Loader/FullScreenLoader';

function Index() {
  const chatId = useParams({
    from: '/chats/$chatId/',
    select: (params) => params.chatId,
  });

  if (!chatId) {
    return <div>Error: chatId is missing</div>;
  }

  return <ChatPage chatId={chatId} />;
}

const AuthenticatedIndex = AuthenticatedRoute(Index);

export const Route = createLazyFileRoute('/chats/$chatId/')({
  component: AuthenticatedIndex,
  pendingComponent: FullScreenLoader,
});
