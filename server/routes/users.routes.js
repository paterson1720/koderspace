const express = require('express');

const service = require('../services/users.service');

const router = express.Router();

router.get('/:userName', service.findByUserName);
router.get('/checkfollower/:userId/:profileUserId', service.checkfollower);
router.post('/update', service.updateUser);
router.post('/follow', service.follow);
router.post('/unfollow', service.unfollow);

module.exports = router;
