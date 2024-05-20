import { createLazyFileRoute } from '@tanstack/react-router';

import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import SignUpPage from '../../features/SignUpPage';

function Index() {
  return <SignUpPage />;
}

export const Route = createLazyFileRoute('/signup/')({
  component: Index,
  pendingComponent: FullScreenLoader,
});
