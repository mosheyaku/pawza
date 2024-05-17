import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { AuthContext, type UserAuthData } from './useAuth';

export interface LoginBody {
  username: string;
  password: string;
}

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserAuthData>();
  const [token, setToken] = useLocalStorage('token', '');
  const [refreshToken, setRefreshToken] = useLocalStorage('refreshToken', '');

  const setAuth = (params: { user: UserAuthData; token: string; refreshToken: string }) => {
    setUser(params.user);
    setToken(params.token);
    setRefreshToken(params.refreshToken);
  };

  const resetAuth = () => {
    setUser(undefined);
    setToken('');
    setRefreshToken('');
  };

  return (
    <AuthContext.Provider value={{ user, setAuth, resetAuth, token, refreshToken }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
