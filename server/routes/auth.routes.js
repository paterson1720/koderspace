const express = require('express');
const passport = require('passport');

const GoogleStrategy = require('../auth/strategies/google');
const JWTStrategy = require('../auth/strategies/jwt');
const { signToken } = require('../auth/authenticationConfig');

const router = express.Router();

passport.use(GoogleStrategy);
passport.use(JWTStrategy);

const scope = ['profile', 'email'];

router.get('/google', passport.authenticate('google', { scope }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    return res.status(200).cookie('jwt', signToken(req.user), { httpOnly: true }).redirect('/');
  }
);

module.exports = router;
