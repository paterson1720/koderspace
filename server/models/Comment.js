const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const CommentSchema = new Schema(
    {
        description: { type: String },
        postId: { type: mongoose.Types.ObjectId },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

CommentSchema.index({ postId: 1 });
module.exports = mongoose.model('Comment', CommentSchema);
