const uniqueRandom = require('unique-random');
const Model = require('../models/User');
const FollowerModel = require('../models/followers');
const FollowedUserModel = require('../models/followedUsers');
const mongoose = require('mongoose');

const random = uniqueRandom(0, 10000);

const service = {
  async findById(id) {
    try {
      const user = await Model.findById(id).lean();
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  },
  async findByUserName(req, res) {
    try {
      const { userName } = req.params;
      const user = await Model.findOne({ userName }).lean();
      res.status(200).json({ user }).end();
    } catch (error) {
      res.status(400).json({ error, user: null }).end();
    }
  },

  async updateUser(req, res) {
    try {
      const { _id, ...userData } = req.body;
      const user = await Model.findByIdAndUpdate(_id, userData, { new: true }).lean();
      res.status(200).json({ user }).end();
    } catch (error) {
      res.status(400).json({ error, user: null }).end();
    }
  },

  async follow(req, res) {
    try {
      const { userId, followedUserId } = req.body;
      await FollowerModel.findOneAndUpdate(
        { userId: followedUserId },
        { $push: { followers: userId } },
        { upsert: true }
      );
      await FollowedUserModel.findOneAndUpdate(
        { userId },
        { $push: { followedUsers: followedUserId } },
        { upsert: true }
      );
      await Model.findByIdAndUpdate(followedUserId, { $inc: { followersCount: 1 } });
      await Model.findByIdAndUpdate(userId, { $inc: { followedUsersCount: 1 } });
      res.status(200).json({ isFollowing: true, followed: true }).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true }).end();
    }
  },

  async unfollow(req, res) {
    try {
      console.log('UNFOLLOW', req.body);
      const { userId, followedUserId } = req.body;
      await FollowerModel.findOneAndUpdate(
        { userId: followedUserId },
        { $pull: { followers: userId } }
      );
      await FollowedUserModel.findOneAndUpdate(
        { userId },
        { $pull: { followedUsers: followedUserId } }
      );
      await Model.findByIdAndUpdate(followedUserId, { $inc: { followersCount: -1 } });
      await Model.findByIdAndUpdate(userId, { $inc: { followedUsersCount: -1 } });
      res.status(200).json({ isFollowing: false, unfollowed: true }).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true }).end();
    }
  },
  async checkfollower(req, res) {
    try {
      const { userId, profileUserId } = req.params;
      const result = await FollowerModel.findOne({
        userId: profileUserId,
        followers: mongoose.Types.ObjectId(userId)
      });
      res.status(200).json({ isFollowing: !!result }).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: true }).end();
    }
  },

  async findByProviderIdOrCreate(providerId, userData) {
    try {
      let user;
      user = await Model.findOne({ providerId }).lean();
      if (!user) {
        userData.userName = `${userData.userName}${random()}`;
        user = await Model.create(userData);
      }
      return { user, error: null };
    } catch (error) {
      return { user: null, error };
    }
  }
};

module.exports = service;
