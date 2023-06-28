import { Router } from 'express';
import { isUserExist, tryCatchWrapper, validationBody } from '../../middleware';
import { schemaEmail, schemaLogIn, schemaReg } from '../../schemas/schema.joi.auth';
import userController from '../../controllers/users.constroller';
import enableLocalStrategy from '../../strategy/passport.strategy.local';

const userRouter: Router = Router();

enableLocalStrategy();

userRouter.post(
  '/register',
  [validationBody(schemaReg), isUserExist],
  tryCatchWrapper(userController.userRegistration.bind(userController))
);

userRouter.post(
  '/login',
  [validationBody(schemaLogIn)],
  tryCatchWrapper(userController.loginUser.bind(userController))
);

userRouter.get(
  '/verify/:verificationToken',
  tryCatchWrapper(userController.verifyUser.bind(userController))
);

userRouter.post(
  '/password/change',
  [validationBody(schemaEmail)],
  tryCatchWrapper(userController.changePassword.bind(userController))
);

export default userRouter;
