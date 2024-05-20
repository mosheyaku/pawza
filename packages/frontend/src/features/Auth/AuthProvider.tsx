import { useState } from 'react';

import { AuthContext, type UserAuthData } from './useAuth';

export interface LoginBody {
  username: string;
  password: string;
}

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserAuthData | null>(null);
  const [isInitiating, setIsInitiating] = useState(true);

  const setUserExternal = (newUser: UserAuthData | null) => {
    setUser(newUser);
    setIsInitiating(false);
  };

  return (
    <AuthContext.Provider value={{ isInitiating, user, setUser: setUserExternal }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
