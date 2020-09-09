const Model = require('../models/Comment');

const service = {
    async create(req, res) {
        try {
            const data = req.body;
            const comment = await Model.create(data);
            res.status(200).json({ comment, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, comment: null }).end();
        }
    },

    async findById(req, res) {
        try {
            const { postId } = req.params;
            const comments = await Model.find({ postId });
            res.status(200).json({ comments, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, comments: null }).end();
        }
    }
};

module.exports = service;
