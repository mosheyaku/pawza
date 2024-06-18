import { createFileRoute } from '@tanstack/react-router';

import AuthenticatedRoute from '../../features/AuthenticatedRoute';
import Home from '../../features/HomePage';
import PopIn from '../../features/PopIn';

function Index() {
  return (
    <PopIn>
      <Home />
    </PopIn>
  );
}

export const Route = createFileRoute('/home/')({
  component: AuthenticatedRoute(Index),
});
