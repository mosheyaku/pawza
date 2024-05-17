import { createContext, useContext } from 'react';

export interface UserAuthData {
  firstName: string;
}

interface AuthContextData {
  token?: string;
  refreshToken?: string;
  user?: UserAuthData;
  setAuth: (params: { user: UserAuthData; token: string; refreshToken: string }) => void;
  resetAuth: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as any);

export const useAuth = () => useContext(AuthContext);

export const useMe = () => useAuth().user;
