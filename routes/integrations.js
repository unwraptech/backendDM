const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const multer = require('multer');
const passport = require('passport')
const controller = require('../controllers/index-controller');

router.get('/add-devices-3devices',
    controller.third.addFOnoAPiDevices
);
router.get('/add-latest-3devices',
    controller.third.addfonoapiLatest
);
module.exports = router;
