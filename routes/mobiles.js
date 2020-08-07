const express = require('express');
const router = express.Router();
const controller = require('../controllers/index-controller');

router.get('/add-devices-3devices',
    controller.mobile.getMobileDevices
);
router.post('/search-mobile/',
    controller.mobile.searchmobile
);
router.post('/compare-mobile',
    controller.mobile.compareMobile
);
router.get('/add-devices-3devices',
    controller.mobile.getMobileDevices
);
module.exports = router;
