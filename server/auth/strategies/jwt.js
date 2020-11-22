const passportJWT = require('passport-jwt');
const { findById } = require('../../services/users.service');

const JWTStrategy = passportJWT.Strategy;

const strategyOptions = {
  jwtFromRequest: (req) => req.cookies.jwt,
  secretOrKey: process.env.JWT_SECRET,
  passReqToCallback: true
};

const verifyUser = async (req, jwtPayload, cb) => {
  const { error, user } = await findById(jwtPayload.data._id);
  if (error) return cb(error);
  req.user = user;
  return cb(null, user);
};

module.exports = new JWTStrategy(strategyOptions, verifyUser);
