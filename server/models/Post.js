const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const { Schema } = mongoose;

const PostSchema = new Schema(
    {
        description: { type: String },
        codeLanguage: { type: String },
        code: { type: String }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema);
