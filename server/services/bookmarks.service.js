const Model = require('../models/Bookmark');

const service = {
  async create(req, res) {
    try {
      const data = req.body;
      await Model.create(data);
      res.status(200).json({ saved: true, error: null }).end();
    } catch (error) {
      res.status(400).json({ error, saved: false }).end();
    }
  },

  async checkBookmark(req, res) {
    try {
      const { userId, postId } = req.params;
      const bookmarked = await Model.findOne({ user: userId, 'post._id': postId });
      res.status(200).json({ bookmarked: !!bookmarked, error: null }).end();
    } catch (error) {
      res.status(400).json({ error, bookmarked: false }).end();
    }
  },

  async findByUserId(req, res) {
    try {
      const { userId } = req.params;
      console.log('USER', userId);
      const bookmarks = await Model.find({ user: userId });
      res.status(200).json({ bookmarks, error: null }).end();
    } catch (error) {
      res.status(400).json({ error, bookmarks: null }).end();
    }
  },

  async deleteById(req, res) {
    try {
      const { bookmarkId } = req.params;
      await Model.findByIdAndDelete(bookmarkId);
      res.status(200).json({ deleted: true, error: null }).end();
    } catch (error) {
      res.status(400).json({ error, deleted: false }).end();
    }
  }
};

module.exports = service;
