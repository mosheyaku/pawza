import type mongoose from 'mongoose';
import { type FilterQuery } from 'mongoose';

import { type PotentialMatchDoc, PotentialMatchModel, PotentialMatchStatus } from '../models/potential-match.js';
import { type UserDoc, UserModel, UserPurpose } from '../models/user.js';
import { createChat } from './chats.js'; // Import the createChat method

export interface PotentialMatchPopulated extends Omit<PotentialMatchDoc, 'user'> {
  user: UserDoc;
}

export const getPotentialMatches = async (userId: mongoose.Types.ObjectId | string) => {
  try {
    const user = await UserModel.findById(userId).orFail();
    console.log('User found:', user);

    const matchesToIgnore = await PotentialMatchModel.find({
      user: user._id,
      status: { $ne: PotentialMatchStatus.Pending },
    });

    const userIdsToIgnore = matchesToIgnore.map((potentialMatch) => potentialMatch.suggestedUser);
    userIdsToIgnore.push(user._id); // don't suggest myself

    const userChoices: FilterQuery<UserDoc> = {
      _id: { $nin: userIdsToIgnore },
      gender: { $in: user.genderPreference },
      genderPreference: user.gender,
    };

    if (user.purpose !== UserPurpose.All) {
      userChoices.purpose = { $in: [user.purpose, UserPurpose.All] };
    }

    const usersToSuggest = await UserModel.aggregate([
      { $match: userChoices },
      { $match: { active: true } },
      { $sample: { size: 10 } },
    ]);

    return usersToSuggest;
  } catch (error) {
    console.error('Error in getPotentialMatches:', error);
    throw error;
  }
};

export const acceptPotentialMatch = async (user: mongoose.Types.ObjectId, suggestedUser: mongoose.Types.ObjectId) => {
  await PotentialMatchModel.updateOne(
    { user, suggestedUser },
    { $set: { status: PotentialMatchStatus.Accepted } },
    { upsert: true },
  );

  // Check for mutual match
  const reverseMatch = await PotentialMatchModel.findOne({
    user: suggestedUser,
    suggestedUser: user,
    status: PotentialMatchStatus.Accepted,
  });

  if (reverseMatch) {
    await createChat(user, suggestedUser);
    console.log("New Chat Created");
  }

};

export const declinePotentialMatch = async (user: mongoose.Types.ObjectId, suggestedUser: mongoose.Types.ObjectId) => {
  await PotentialMatchModel.updateOne(
    { user, suggestedUser },
    { $set: { status: PotentialMatchStatus.Declined } },
    { upsert: true },
  );
};
