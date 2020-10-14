const express = require('express');

const service = require('../services/bookmarks.service');

const router = express.Router();

router.post('/save', service.create);
router.get('/:userId', service.findByUserId);
router.get('/check/:userId/:postId', service.checkBookmark);
router.delete('/:bookmarkId', service.deleteById);

module.exports = router;
