import { Router } from 'express';
import { query } from 'express-validator';
import mongoose from 'mongoose';

import { acceptPotentialMatch, declinePotentialMatch, getPotentialMatches } from '../../bll/potential-matches.js';
import { toPotentialMatchDto } from '../dtos/potential-match.js';
import { requestQueryType } from '../middlewares/request-types.js';
import { validateRequest } from '../middlewares/validate-request.js';

const potentialMatcherRouter = Router();

potentialMatcherRouter.get(
  '/',
  query('userIdsToIgnore').optional().isArray(),
  validateRequest(),
  requestQueryType<{ userIdsToIgnore: string[] }>(),
  async (req, res) => {
    const userIdsToIgnore = (req.query.userIdsToIgnore || []).map((id) => new mongoose.Types.ObjectId(id));
    const users = await getPotentialMatches(req.user.id, userIdsToIgnore);
    res.json(users.map((user) => toPotentialMatchDto(user)));
  },
);

potentialMatcherRouter.post('/:suggestedUserId/accept', async (req, res) => {
  const suggestedUserId = new mongoose.Types.ObjectId(req.params.suggestedUserId);
  await acceptPotentialMatch(req.user.id, suggestedUserId);

  res.status(200).send();
});

potentialMatcherRouter.post('/:suggestedUserId/decline', async (req, res) => {
  const suggestedUserId = new mongoose.Types.ObjectId(req.params.suggestedUserId);
  await declinePotentialMatch(req.user.id, suggestedUserId);

  res.status(200).send();
});

export { potentialMatcherRouter };
