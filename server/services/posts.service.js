const Model = require('../models/Post');
const { uploadToCloudinary } = require('./upload.service');
const CommentModel = require('../models/Comment');

const storeFiles = async (files) => {
    if (!files.length) return { error: null, results: [] };
    let error = null;
    const results = [];
    const options = { folder: `koderSpace` };
    for await (const file of files) {
        if (error) break;
        const { path } = file;
        const { isError, result } = await uploadToCloudinary(path, options);
        if (isError) error = result;
        results.push(result);
    }
    return { error, results };
};

const service = {
    async findAll(req, res) {
        try {
            const posts = await Model.find({}).lean().populate('user').sort('-createdAt');
            res.status(200).json({ posts }).end();
        } catch (error) {
            res.status(400).json({ error, posts: null }).end();
        }
    },

    async findById(req, res) {
        try {
            const { postId } = req.params;
            const post = await Model.findById(postId).populate('user').lean();
            res.status(200).json({ post }).end();
        } catch (error) {
            res.status(400).json({ error, post: null }).end();
        }
    },

    async create(req, res) {
        try {
            let data = { ...req.body };
            const files = req.files || [];
            const { error, results } = await storeFiles(files);
            data.images = results.map((obj) => obj.url);
            if (error) return res.status(200).json({ post: null, error });
            let post = await Model.create(data);
            post = await post.populate('user').execPopulate();
            console.log(post);
            res.status(200).json({ post, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, post: null }).end();
        }
    },
    async editPost(req, res) {
        try {
            const { postId } = req.params;
            console.log(postId);
            const data = req.body;
            console.log(data);
            const post = await Model.findByIdAndUpdate(postId, data);
            res.status(200).json({ post, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, post: null }).end();
        }
    },

    async deleteById(req, res) {
        try {
            const { postId } = req.params;
            await Model.deleteOne({ _id: postId });
            await CommentModel.deleteMany({ postId });
            res.status(200).json({ deleted: true, error: null }).end();
        } catch (error) {
            res.status(400).json({ error, deleted: false }).end();
        }
    }
};

module.exports = service;
