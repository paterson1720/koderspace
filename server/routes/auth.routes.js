const express = require('express');
const passport = require('passport');

const GoogleStrategy = require('../auth/strategies/google');

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
    function (req, res) {
        console.log('USER IN REQUEST', req.user);
        res.redirect('/testPage');
    }
);

module.exports = router;
