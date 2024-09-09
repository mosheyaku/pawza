import { type Gender, type UserDoc, type UserPurpose } from '../../models/user.js';

export interface ProfileDto {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  purpose: UserPurpose;
  profilePictureSrc: string;
}

export const toProfileDto = (user: UserDoc): ProfileDto => ({
  id: user._id.toString(),
  firstName: user.firstName,
  lastName: user.lastName,
  birthDate: user.birthDate.toISOString(),
  gender: user.gender,
  purpose: user.purpose,
  profilePictureSrc: user.photos[0],
});
