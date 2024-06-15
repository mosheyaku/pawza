import { Router } from 'express';
import { body, query } from 'express-validator';

import { generateJwtForUser, getUserFromRefreshToken, login } from '../../bll/auth.js';
import { createNewUser, userExists } from '../../bll/user.js';
import { AppBadRequestError } from '../../errors/app-bad-request.js';
import { AppNotAuthorizedError } from '../../errors/app-not-authorized.js';
import { AppError } from '../../errors/base.js';
import { Gender, UserModel, UserPurpose } from '../../models/user.js';
import { toUserDto } from '../dtos/user.js';
import { auth } from '../middlewares/auth.js';
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

authRouter.post(
  '/sign-up',
  body('email', 'Invalid email address specified').isString().trim().notEmpty().isEmail(),
  body('password', 'Password must be at least 8 characters long').isString().notEmpty().isLength({ min: 8, max: 128 }),
  // TODO: Uncomment, change sign-up to include these details

  // body('firstName', 'Invalid first name specified')
  //   .isString()
  //   .trim()
  //   .notEmpty()
  //   .isLength({ min: 2, max: 128 }),
  // body('lastName', 'Invalid last name specified').isString().trim().notEmpty().isLength({ min: 2, max: 128 }),
  // body('birthDate', 'Invalid birth date specified').isISO8601().toDate(),
  // body('gender', 'Invalid gender specified').isIn(Object.values(Gender)),
  // body('genderPreference', 'Invalid gender Purpose specified').isArray(),
  // body('genderPreference.*', 'Invalid gender Purpose specified').isIn(Object.values(Gender)),
  // body('purpose', 'Invalid purpose specified').isIn(Object.values(UserPurpose)),
  // body('location', 'Invalid location specified').exists(),

  validateRequest(),
  requestBodyType<{
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    birthDate: Date;
    gender: Gender;
    genderPreference: Gender[];
    purpose: UserPurpose;
    location: [number, number];
  }>(),
  async (req, res) => {
    const {
      email,
      password,
      // TODO: Remove fallback values when sign up is complete
      firstName = 'Itamar',
      lastName = 'Zwi',
      birthDate = new Date(),
      gender = Gender.Woman,
      genderPreference = [Gender.Man, Gender.Woman],
      purpose = UserPurpose.All,
      location = [0, 0],
    } = req.body;

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
      genderPreference,
      purpose: purpose as any,
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

authRouter.post('/token/refresh', validateRequest(), requestBodyType<{ refreshToken?: string }>(), async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    throw new AppNotAuthorizedError();
  }

  try {
    const user = await getUserFromRefreshToken(refreshToken);
    if (!user) {
      throw new AppNotAuthorizedError();
    }

    const { token, refreshToken: newRefreshToken } = await generateJwtForUser(user);
    return res.json({ user: toUserDto(user), token, refreshToken: newRefreshToken });
  } catch (e) {
    // Any unhandled error above is counted as failure to refresh the token and is thus a Not Authorized error
    if (e instanceof AppError) {
      throw e;
    }

    throw new AppNotAuthorizedError();
  }
});

authRouter.get('/me', auth(), async (req, res) => {
  const user = await UserModel.findById(req.user.id).orFail();

  res.json(toUserDto(user));
});

export { authRouter };
