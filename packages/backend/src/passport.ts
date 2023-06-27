/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
import passport from 'passport';
import passportLocal from 'passport-local';
import { User } from './entities/User';
import dataSource from './config/datasourse';
import { isValidPassword } from './helpers';

const LocalStrategy = passportLocal.Strategy;

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await dataSource.manager.findOneBy(User, { email });

        if (!user) {
          return done(null, false, { message: 'Wrong email' });
        }

        const validate = await isValidPassword(password, user.password);

        if (!validate) {
          return done(null, false, { message: 'Wrong password' });
        }

        return done(null, user, { message: 'Logged in successfully' });
      } catch (error) {
        return done(error);
      }
    }
  )
);
