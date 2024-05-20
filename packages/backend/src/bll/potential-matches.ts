import type mongoose from 'mongoose';

import { UserModel } from '../models/user.js';

export const getPotentialMatches = async (userId: mongoose.Types.ObjectId | string) => {
  // TODO: GAL
  // MUST HAVE FOR WEDNESDAY:
  // change this so that if there is a PotentialMatch of status ACCEPTED, that user will NOT be suggested

  const matches = await UserModel.aggregate([{ $sample: { size: 5 } }]);

  return matches;
};
