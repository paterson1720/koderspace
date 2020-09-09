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
        provider: { type: String },
        providerId: { type: String },
        picture: { type: String },
        code: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
