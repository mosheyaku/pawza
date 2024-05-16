import type mongoose from 'mongoose';

import { UserModel } from '../models/user.js';

export const getPotentialMatches = async (userId: mongoose.Types.ObjectId | string) => {
  // TODO: Implement this
  const matches = await UserModel.aggregate([{ $sample: { size: 5 } }]);

  return matches;
};
