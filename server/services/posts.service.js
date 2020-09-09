const Model = require('../models/Post');

const service = {
    async findAll(req, res) {
        try {
            const posts = await Model.find({}).lean().sort('-createdAt');
            res.status(200).json({ posts }).end();
        } catch (error) {
            res.status(400).json({ error, posts: null }).end();
        }
    },

    async findById(req, res) {
        try {
            const { post_id } = req.params;
            const post = await Model.findById(post_id).lean();
            res.status(200).json({ post }).end();
        } catch (error) {
            res.status(400).json({ error, post: null }).end();
        }
    },

    async create(req, res) {
        try {
            const data = req.body;
            const post = await Model.create(data);
            res.status(200).json({ post, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, post: null }).end();
        }
    }
};

module.exports = service;
