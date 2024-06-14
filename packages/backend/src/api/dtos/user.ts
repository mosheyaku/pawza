import { type Gender, type UserDoc, type UserPurpose } from '../../models/user.js';

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  purpose: UserPurpose;
  active: boolean;
}

export const toUserDto = (user: UserDoc): UserDto => ({
  id: user._id.toString(),
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  birthDate: user.birthDate.toISOString(),
  gender: user.gender,
  purpose: user.purpose,
  active: user.active,
});
