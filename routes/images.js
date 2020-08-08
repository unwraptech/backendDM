const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const multer = require('multer');
const passport = require('passport')
const controller = require('../controllers/index-controller');

router.post('/save-images',
    controller.image.saveimage
);

module.exports = router;
