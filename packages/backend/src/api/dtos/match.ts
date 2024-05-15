import { type UserDoc } from '../../models/user.js';

export interface MatchDto {}

export const toMatchDto = (user: UserDoc): MatchDto => ({
  firstName: user.firstName,
  birthDate: user.birthDate,
  gender: user.gender,
});
