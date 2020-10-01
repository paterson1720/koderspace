const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const { findByProviderIdOrCreate } = require('../../services/users.service');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

const options = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
};

const verifyUser = async (accessToken, refreshToken, profile, done) => {
    const { id, provider, _json } = profile;
    const userData = {
        provider,
        providerId: id,
        userName: _json.given_name,
        givenName: _json.given_name,
        familyName: _json.family_name,
        fullName: _json.name,
        picture: _json.picture,
        email: _json.email
    };
    const { user, error } = await findByProviderIdOrCreate(id, userData);
    return done(error, user);
};

module.exports = new GoogleStrategy(options, verifyUser);
