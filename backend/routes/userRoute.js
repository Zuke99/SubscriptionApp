const userController = require('../controllers/userController');

const express = require('express');
const userMiddleware  = require('../middlewares/userMiddleware');
const router = express.Router();

router.post('/user/register',userMiddleware.checkUsernameExists, userController.registerUser);
router.post('/user/login', userController.loginUser);
module.exports = router;