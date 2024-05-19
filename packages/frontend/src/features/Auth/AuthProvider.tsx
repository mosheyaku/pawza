import { useState } from 'react';

import { AuthContext, type UserAuthData } from './useAuth';

export interface LoginBody {
  username: string;
  password: string;
}

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserAuthData | null>(null);

  const setUserExternal = (newUser: UserAuthData | null) => {
    setUser(newUser);
  };

  return <AuthContext.Provider value={{ user, setUser: setUserExternal }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
