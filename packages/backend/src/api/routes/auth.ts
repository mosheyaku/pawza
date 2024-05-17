import { Router } from 'express';
import { body, query } from 'express-validator';

import { generateJwtForUser, login } from '../../bll/auth.js';
import { createNewUser, userExists } from '../../bll/user.js';
import { AppBadRequestError } from '../../errors/app-bad-request.js';
import { Gender, UserPurpose } from '../../models/user.js';
import { toUserDto } from '../dtos/user.js';
import { requestBodyType, requestQueryType } from '../middlewares/request-types.js';
import { validateRequest } from '../middlewares/validate-request.js';

const authRouter = Router();

authRouter.get(
  '/email-available',
  query('email', 'Invalid email address specified').isString().trim().notEmpty().isEmail(),
  validateRequest(),
  requestQueryType<{ email: string }>(),
  async (req, res) => {
    const { email } = req.query;

    const emailTaken = await userExists(email);

    res.json(!emailTaken);
  },
);

// TODO: JASON - Handle photos upload
authRouter.post(
  '/sign-up',
  body('email', 'Invalid email address specified').isString().trim().notEmpty().isEmail(),
  body('password', 'Invalid password specified').isString().notEmpty().isLength({ min: 8, max: 128 }),
  body('firstName', 'Invalid first name specified').isString().trim().notEmpty().isLength({ min: 2, max: 128 }),
  body('lastName', 'Invalid last name specified').isString().trim().notEmpty().isLength({ min: 2, max: 128 }),
  body('birthDate', 'Invalid birth date specified').isISO8601().toDate(),
  body('gender', 'Invalid gender specified').isIn(Object.values(Gender)),
  body('purpose', 'Invalid purpose specified').isIn(Object.values(UserPurpose)),
  body('location', 'Invalid location specified').exists(), // TODO: JASON - How do we pass location?
  validateRequest(),
  requestBodyType<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    birthDate: Date;
    gender: Gender;
    purpose: UserPurpose;
    location: [number, number];
  }>(),
  async (req, res) => {
    const { email, firstName, lastName, password, birthDate, gender, purpose, location } = req.body;

    if (await userExists(email)) {
      throw new AppBadRequestError('This email address is already taken');
    }

    await createNewUser({
      email,
      firstName,
      lastName,
      password,
      birthDate,
      gender,
      purpose,
      location,
    });

    return res.status(201).send();
  },
);

authRouter.post(
  '/login',
  body('email').isString().trim().notEmpty(),
  body('password').isString().notEmpty(),

  validateRequest(),
  requestBodyType<{ email: string; password: string }>(),
  async (req, res) => {
    const { email, password } = req.body;

    const user = await login(email, password);
    const { token, refreshToken } = await generateJwtForUser(user);

    return res.json({ user: toUserDto(user), token, refreshToken });
  },
);

export { authRouter };
