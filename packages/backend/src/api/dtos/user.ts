import { type UserDoc } from '../../models/user.js';

export interface UserDto {
  email: string;
}

export const toUserDto = (user: UserDoc): UserDto => ({
  email: user.email,
});
