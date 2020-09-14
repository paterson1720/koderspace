const express = require('express');

const { upload, singleFileUpload, multipleFileUpload } = require('../services/upload.service');

const router = express.Router();

router.post('/', upload().single('file'), singleFileUpload);
router.post('/bulk', upload().array('file'), multipleFileUpload);

module.exports = router;
