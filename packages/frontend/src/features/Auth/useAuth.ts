import { createContext, useContext } from 'react';

import { type User } from '../../api/me';

interface AuthContextData {
  isInitiating: boolean;
  user: User | null | undefined;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextData>({} as any);

export const useAuth = () => useContext(AuthContext);
