import { apiClient } from './base';
import { type Gender, type UserPurpose } from './me';

// TODO: Response interface

export interface SignUpData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthDate: Date;
  gender: Gender;
  genderPreference: Gender[];
  purpose: UserPurpose;
}

export const signUp = (data: SignUpData) => apiClient.post('/auth/sign-up', data);
