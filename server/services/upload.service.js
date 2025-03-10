const util = require('util');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const cloudinaryUpload = util.promisify(cloudinary.uploader.upload);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../uploads/'));
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
