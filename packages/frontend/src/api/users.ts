import { apiClient } from './base';
import { type Gender, type UserPurpose } from './me';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  purpose: UserPurpose;
  profilePictureSrc: string;
  didYouLikeThem: boolean;
}

export const getUserProfile = (userId: string) =>
  apiClient.get<UserProfile>(`/users/${userId}/profile`).then((res) => res.data);
