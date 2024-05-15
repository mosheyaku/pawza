import { Router } from 'express';

import { getPotentialMatches } from '../../bll/potential-matches.js';
import { toMatchDto } from '../dtos/match.js';

const potentialMatcherRouter = Router();

potentialMatcherRouter.get('/', async (req, res) => {
  const users = await getPotentialMatches(req.user.id);
  res.json(users.map((user) => toMatchDto(user)));
});

export { potentialMatcherRouter };
