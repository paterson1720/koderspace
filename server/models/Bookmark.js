const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const BookmarkSchema = new Schema(
    {
        post: { type: Object },
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
    { timestamps: true }
);

BookmarkSchema.index({ user: 1 });
module.exports = mongoose.model('Bookmark', BookmarkSchema);
