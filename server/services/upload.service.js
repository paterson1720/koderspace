const util = require('util');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cloudinaryUpload = util.promisify(cloudinary.uploader.upload);

cloudinary.config({
    cloud_name: 'technologeek',
    api_key: '564942264216694',
    api_secret: 'Hf1u83pG2PwhcqJap3_qPkR_4-A'
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = (options) => multer({ storage, ...options });

const uploadToCloudinary = async (path, options) => {
    try {
        const result = await cloudinaryUpload(path, options);
        fs.unlinkSync(path);
        return { isError: false, result };
    } catch (error) {
        return { isError: true, result: error };
    }
};

const singleFileUpload = async (req, res) => {
    const { path } = req.file;
    console.log('path', path);
    const options = { folder: `koderSpace` };
    const { isError, result } = await uploadToCloudinary(path, options);
    if (isError) return res.status(400).json(result);
    res.status(200).json(result);
};

const multipleFileUpload = async (req, res) => {
    const files = req.files;
    const options = { folder: `koderSpace` };
    const results = [];
    for await (const file of files) {
        const { path } = file;
        const { isError, result } = await uploadToCloudinary(path, options);
        if (isError) return res.status(400).json({ error: result, uploaded: results });
        results.push(result);
    }
    res.status(200).json(results);
};

module.exports = { upload, singleFileUpload, uploadToCloudinary, multipleFileUpload };
