const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        description: { type: String },
        codeLanguage: { type: String },
        code: { type: String },
        images: [String],
        commentsCount: { type: Number, default: 0 }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
