import { createContext, useContext } from 'react';

export interface UserAuthData {
  firstName: string;
}

interface AuthContextData {
  user: UserAuthData | null;
  setUser: (user: UserAuthData | null) => void;
}

export const AuthContext = createContext<AuthContextData>({} as any);

export const useAuth = () => useContext(AuthContext);

export const useMe = () => useAuth().user;
