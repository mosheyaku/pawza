import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import Home from '../../features/HomePage';

function Index() {
  return <Home />;
}

export const Route = createFileRoute('/home/')({
  component: AuthenticatedRoute(Index),
});
