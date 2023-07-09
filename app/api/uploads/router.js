const express = require('express');
const router = express.Router();
const { auth } = require('../../middleware/auth');
const controller = require('./controller');
const uploadMiddleware = require('../../middleware/multer')

router.post('/uploads', auth, uploadMiddleware.single('image'), controller.uploadImage);

module.exports = router;
