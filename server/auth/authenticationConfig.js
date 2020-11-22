const passport = require('passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const userService = require('../services/users.service');

const { JWT_SECRET } = process.env;

const sessionOptions = {
  secret: JWT_SECRET,
  saveUninitialized: false,
  resave: false
};

const initializeAuthentication = (app) => {
  app.use(session(sessionOptions));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    const { user, error } = await userService.findById(id);
    if (error) return done(error, null);
    return done(null, user);
  });
};

const authenticateUser = () => passport.authenticate('jwt', { failureRedirect: '/login' });

function ensureAuthentication(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect('/login');
  }
}

const signToken = (user) => {
  return jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: 604800
  });
};

module.exports = { initializeAuthentication, ensureAuthentication, signToken, authenticateUser };
