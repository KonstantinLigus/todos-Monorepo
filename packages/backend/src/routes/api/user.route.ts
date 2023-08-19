import { Router } from 'express';
import enableStrategyJWT from '../../strategy/passport.strategy.JWT';
import { isUserExist, tryCatchWrapper, validationBody } from '../../middleware';
import { schemaEmail, schemaLogIn, schemaReg } from '../../schemas/schema.joi.auth';
import userController from '../../controllers/users.constroller';
import enableLocalStrategy from '../../strategy/passport.strategy.local';
import { authenticateLogin } from '../../strategy/passport.authenticate.login';
import authenticateJWT from '../../strategy/passport.authenticate.JWT';

const userRouter: Router = Router();

enableLocalStrategy();
enableStrategyJWT();

userRouter.post(
  '/register',
  [validationBody(schemaReg), isUserExist],
  tryCatchWrapper(userController.userRegistration.bind(userController))
);

userRouter.post('/login', [validationBody(schemaLogIn)], authenticateLogin);

userRouter.get(
  '/verify/:verificationToken',
  tryCatchWrapper(userController.verifyUser.bind(userController))
);

userRouter.get(
  '/refresh',
  [authenticateJWT],
  tryCatchWrapper(userController.refreshUser.bind(userController))
);

userRouter.post(
  '/password/send',
  [validationBody(schemaEmail)],
  tryCatchWrapper(userController.changePassword.bind(userController))
);

export default userRouter;
