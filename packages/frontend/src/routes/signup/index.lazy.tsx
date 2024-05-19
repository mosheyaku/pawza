import { createLazyFileRoute } from '@tanstack/react-router';

import SignUpPage from '../../features/SignUpPage';

function Index() {
  return <SignUpPage />;
}

export const Route = createLazyFileRoute('/signup/')({
  component: Index,
});
