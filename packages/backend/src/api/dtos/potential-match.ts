import dayjs from 'dayjs';

import { type UserDoc } from '../../models/user.js';

export interface PotentialMatchDto {
  id: string;
  firstName: string;
  age: number;
  gender: string;
  photo: string;
}

export const toPotentialMatchDto = (user: UserDoc): PotentialMatchDto => ({
  id: user._id.toString(),
  firstName: user.firstName,
  age: dayjs().diff(user.birthDate, 'years'),
  gender: user.gender,
  photo: user.photos[0],
});
