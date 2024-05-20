import { createContext, useContext } from 'react';

export interface UserAuthData {
  firstName: string;
}

interface AuthContextData {
  isInitiating: boolean;
  user: UserAuthData | null | undefined;
  setUser: (user: UserAuthData | null) => void;
}

export const AuthContext = createContext<AuthContextData>({} as any);

export const useAuth = () => useContext(AuthContext);

export const useMe = () => useAuth().user;
