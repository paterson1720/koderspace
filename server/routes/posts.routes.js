const express = require('express');

const service = require('../services/posts.service');

const router = express.Router();

router.get('/', service.findAll);
router.get('/:post_id', service.findById);
router.post('/create', service.create);

module.exports = router;
