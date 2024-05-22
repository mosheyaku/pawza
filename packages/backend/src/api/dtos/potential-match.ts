import { type Gender, type UserDoc } from '../../models/user.js';

export interface PotentialMatchDto {
  firstName: string;
  birthDate: string;
  gender: Gender;
  photo: string;
}

export const toPotentialMatchDto = (user: UserDoc): PotentialMatchDto => ({
  firstName: user.firstName,
  birthDate: user.birthDate,
  gender: user.gender,
  photo: user.photos[0],
});
