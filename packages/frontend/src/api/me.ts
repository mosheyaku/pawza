import { apiClient } from './base';

export enum Gender {
  Man = 'man',
  Woman = 'woman',
  NonBinary = 'nonbinary',
}

export enum UserPurpose {
  Platonic = 'platonic',
  Romantic = 'romantic',
  All = 'all',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  purpose: UserPurpose;
}

export const getMe = () => apiClient.get<User>('/auth/me');
