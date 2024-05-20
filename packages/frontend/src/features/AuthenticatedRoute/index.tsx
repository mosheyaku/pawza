import { Navigate } from '@tanstack/react-router';

import { useAuth } from '../Auth/useAuth';

const AuthenticatedRoute = (Component: () => JSX.Element) =>
  function AuthenticatedRouteWrapper(props: any) {
    const { user } = useAuth();

    if (!user) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

export default AuthenticatedRoute;
