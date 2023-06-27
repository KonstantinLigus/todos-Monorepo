import { Router } from 'express';
import { isUserExist, tryCatchWrapper, validationBody } from '../../middleware';
import { schemaLogIn, schemaReg } from '../../schemas/schema.joi.auth';
import userController from '../../controllers/users.constroller';

const router: Router = Router();

router.post(
  '/register',
  [validationBody(schemaReg), isUserExist],
  tryCatchWrapper(userController.userRegistration.bind(userController))
);

router.post(
  '/login',
  [validationBody(schemaLogIn)],
  tryCatchWrapper(userController.loginUser.bind(userController))
);

router.get(
  '/verify/:verificationToken',
  tryCatchWrapper(userController.verifyUser.bind(userController))
);

export default router;
