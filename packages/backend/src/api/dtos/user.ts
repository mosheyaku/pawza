import { type Gender, type UserDoc, type UserPurpose } from '../../models/user.js';

export interface UserDto {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  purpose: UserPurpose;
}

export const toUserDto = (user: UserDoc): UserDto => ({
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  birthDate: user.birthDate.toISOString(),
  gender: user.gender,
  purpose: user.purpose,
});
