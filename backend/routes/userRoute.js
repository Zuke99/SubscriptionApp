const userController = require('../controllers/userController');

const express = require('express');
const userMiddleware  = require('../middlewares/userMiddleware');
const router = express.Router();

router.post('/user/register',userMiddleware.checkUsernameExists, userController.registerUser);
router.post('/user/login', userController.loginUser);
router.post('/user/get-user', userController.getUserInfo);
module.exports = router;