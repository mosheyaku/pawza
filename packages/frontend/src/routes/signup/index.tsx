import { createFileRoute } from '@tanstack/react-router';

import FullScreenLoader from '../../features/Loader/FullScreenLoader';
import SignUpPage from '../../features/SignUpPage';

function Index() {
  return <SignUpPage />;
}

export const Route = createFileRoute('/signup/')({
  component: Index,
  pendingComponent: FullScreenLoader,
});
