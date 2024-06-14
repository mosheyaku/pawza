import { useState } from 'react';

import { type User } from '../../api/me';
import { AuthContext } from './useAuth';

export interface LoginBody {
  username: string;
  password: string;
}

const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitiating, setIsInitiating] = useState(true);

  const setUserExternal = (newUser: User | null) => {
    setUser(newUser);
    setIsInitiating(false);
  };

  return (
    <AuthContext.Provider value={{ isInitiating, user, setUser: setUserExternal }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
