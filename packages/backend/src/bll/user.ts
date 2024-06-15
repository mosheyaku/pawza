import type mongoose from 'mongoose';

import { type Gender, type UserDoc, UserModel, type UserPurpose } from '../models/user.js';
import { hashPassword } from './auth.js';

export const createNewUser = async (params: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthDate: Date;
  gender: Gender;
  genderPreference: Gender[];
  purpose: UserPurpose;
  location: [number, number];
}): Promise<UserDoc> => {
  const { email, firstName, lastName, password, birthDate, gender, genderPreference, purpose, location } = params;

  const hashedPassword = await hashPassword(password);

  const user = new UserModel({
    email,
    firstName,
    lastName,
    password: hashedPassword,
    birthDate,
    gender,
    genderPreference,
    purpose,
    location,
    photos: [],
  });

  return await user.save();
};

export const userExists = async (email: string) => await UserModel.exists({ email });

export const changeProfileImage = async (userId: mongoose.Types.ObjectId, fileUri: string) =>
  await UserModel.updateOne({ _id: userId }, { $set: { 'photos.0': fileUri } });
