const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const multer = require('multer');
const passport = require('passport')
const controller = require('../controllers/index-controller');

router.post('/get-devices',
    controller.devices.getdevices
);
router.get('/getDeviceById/:id',
controller.devices.getDeviceById
)

module.exports = router;
