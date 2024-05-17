import { createLazyFileRoute } from '@tanstack/react-router';

import Home from '../../features/HomePage';

function Index() {
  return <Home />;
}

export const Route = createLazyFileRoute('/home/')({
  component: Index,
});
