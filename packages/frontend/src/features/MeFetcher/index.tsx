import type React from 'react';
import { useEffect } from 'react';

import { getMe } from '../../api/me';
import { useAuth } from '../Auth/useAuth';
import FullScreenLoader from '../Loader/FullScreenLoader';

function MeFetcher({ children }: React.PropsWithChildren) {
  const { isInitiating, setUser } = useAuth();

  useEffect(() => {
    if (isInitiating) {
      getMe()
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isInitiating) {
    return <FullScreenLoader />;
  }

  return children;
}

export default MeFetcher;
