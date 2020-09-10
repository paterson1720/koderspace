const express = require('express');
const passport = require('passport');

const GoogleStrategy = require('../auth/strategies/google');
// const { signToken } = require('../auth/authenticationConfig');

const router = express.Router();

passport.use(GoogleStrategy);

const scope = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
];

router.get('/google', passport.authenticate('google', { scope }));

router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        return res.status(200).redirect('/');
    }
);

module.exports = router;
