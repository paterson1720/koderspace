const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const FollowerSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        followers: [Schema.Types.ObjectId]
    },
    { timestamps: true }
);

FollowerSchema.index({ userId: 1 });
module.exports = mongoose.model('Follower', FollowerSchema);
