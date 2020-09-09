const express = require('express');

const service = require('../services/comments.service');

const router = express.Router();

router.post('/create', service.create);
router.get('/:postId', service.findById);

module.exports = router;
