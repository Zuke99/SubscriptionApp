const registerUserController = require('../controllers/userController');

const express = require('express');
const userMiddleware  = require('../middlewares/userMiddleware');
const router = express.Router();

router.post('/user/register',userMiddleware.checkUsernameExists, registerUserController.registerUser);
module.exports = router;