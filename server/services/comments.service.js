const Model = require('../models/Comment');
const PostModel = require('../models/Post');

const service = {
    async create(req, res) {
        try {
            const data = req.body;
            let comment = await Model.create(data);
            comment = await comment.populate('user').execPopulate();
            await PostModel.findByIdAndUpdate(data.postId, { $inc: { commentsCount: 1 } });
            res.status(200).json({ comment, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, comment: null }).end();
        }
    },

    async findByPostId(req, res) {
        try {
            const { postId } = req.params;
            const comments = await Model.find({ postId }).populate('user');
            res.status(200).json({ comments, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, comments: null }).end();
        }
    },

    async deleteById(req, res) {
        try {
            const { commentId } = req.params;
            const comment = await Model.findByIdAndDelete(commentId);
            const { postId } = comment;
            await PostModel.findByIdAndUpdate(postId, { $inc: { commentsCount: -1 } });
            res.status(200).json({ deleted: true, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, deleted: false }).end();
        }
    }
};

module.exports = service;
