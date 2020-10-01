const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const FollowedUserSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        followedUsers: [Schema.Types.ObjectId]
    },
    { timestamps: true }
);

FollowedUserSchema.index({ userId: 1 });
module.exports = mongoose.model('FollowedUser', FollowedUserSchema);
