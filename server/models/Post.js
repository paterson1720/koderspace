const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        description: { type: String },
        codeLanguage: { type: String },
        code: { type: String },
        images: [String]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
