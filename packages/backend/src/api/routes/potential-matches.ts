import { Router } from 'express';
import mongoose from 'mongoose';

import { acceptPotentialMatch, declinePotentialMatch, getPotentialMatches } from '../../bll/potential-matches.js';
import { toPotentialMatchDto } from '../dtos/potential-match.js';

const potentialMatcherRouter = Router();

potentialMatcherRouter.get('/', async (req, res) => {
  const users = await getPotentialMatches(req.user.id);
  res.json(users.map((user) => toPotentialMatchDto(user)));
});

potentialMatcherRouter.post('/:suggestedUserId/accept', async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const suggestedUserId = new mongoose.Types.ObjectId(req.params.suggestedUserId);
  await acceptPotentialMatch(userId, suggestedUserId);

  res.status(200).send();
});

potentialMatcherRouter.post('/:suggestedUserId/decline', async (req, res) => {
  const userId = new mongoose.Types.ObjectId(req.user.id);
  const suggestedUserId = new mongoose.Types.ObjectId(req.params.suggestedUserId);
  await declinePotentialMatch(userId, suggestedUserId);

  res.status(200).send();
});

export { potentialMatcherRouter };
