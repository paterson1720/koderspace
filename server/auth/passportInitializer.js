const passport = require('passport');
const userService = require('../services/users.service');

const initializePassport = (app) => {
    app.use(passport.initialize());
    passport.serializeUser((user, done) => done(null, user._id));

    passport.deserializeUser(async (id, done) => {
        const { user, error } = await userService.findById(id).lean();
        if (error) return done(error, null);
        return done(null, user);
    });
};

module.exports = initializePassport;
