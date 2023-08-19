import passport from 'passport';
import passportLocal from 'passport-local';
import UserService from '../services/users.service';
import { isValidPassword } from '../helpers';

const LocalStrategy = passportLocal.Strategy;
const userService = new UserService();

const enableLocalStrategy = () =>
  passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await userService.getUserBy({ email });

          if (!user) {
            return done(null, false, { message: 'Wrong email' });
          }
          const validate = await isValidPassword(password, user.password);
          if (!validate) {
            return done(null, false, { message: 'Wrong password' });
          }
          if (!user.isVerify) {
            return done(null, false, { message: 'Email does not verified' });
          }
          if (user) {
            return done(null, user, { message: 'Logged in successfully' });
          }
        } catch (error) {
          done(error);
        }
      }
    )
  );

export default enableLocalStrategy;
