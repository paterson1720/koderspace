const express = require('express');

const service = require('../services/posts.service');
const { upload } = require('../services/upload.service');

const router = express.Router();

router.get('/', service.findAll);
router.get('/:postId', service.findById);
router.post('/create', upload().array('file'), service.create);
router.post('/edit/:postId', service.editPost);
router.delete('/:postId', service.deleteById);

module.exports = router;
