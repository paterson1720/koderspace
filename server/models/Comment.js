const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        description: { type: String },
        postId: { type: mongoose.Types.ObjectId }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentSchema);
