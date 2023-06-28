import passport from 'passport';
import passportJWT from 'passport-jwt';

const JWTstrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const enableStrategyJWT = () =>
  passport.use(
    'jwt',
    new JWTstrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
      },
      async (jwtPayload: { id: string }, done) => {
        try {
          return done(null, jwtPayload.id);
        } catch (error) {
          done(error);
        }
      }
    )
  );

export default enableStrategyJWT;
