const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        fullName: { type: String },
        userName: { type: String },
        givenName: { type: String },
        familyName: { type: String },
        email: { type: String },
        biography: { type: String },
        provider: { type: String },
        providerId: { type: String },
        picture: { type: String },
        location: { type: String },
        website: { type: String },
        followersCount: { type: Number, default: 0 },
        followedUsersCount: { type: Number, default: 0 },
        code: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
