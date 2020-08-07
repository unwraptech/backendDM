const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const multer = require('multer');
const passport = require('passport')
const controller = require('../controllers/index-controller');
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './public/images/user')
    },
    filename: (req, file, callBack) => {
        callBack(null, uuidv4() + `${file.originalname}`)
    }
})
const upload_user = multer({ storage: storage });

router.post('/signUp',
    controller.auth.addUser
);
router.post('/authenticate',
    controller.auth.login
);
router.delete('/deleteuser/:id',
    passport.authenticate('jwt', { session: false }),
    controller.users.deleteUser
);
router.get('/getUserbyid/:id',
    passport.authenticate('jwt', { session: false }),
    controller.users.getUserbyId
);
router.put('/updateUser',
    passport.authenticate('jwt', { session: false }),
    upload_user.single('image'),
    controller.users.updateUser
);
router.get('/getUsers', 
    controller.users.getAllUsers)
module.exports = router;
