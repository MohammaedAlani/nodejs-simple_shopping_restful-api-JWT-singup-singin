const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const cheakAuth = require('../middleware/cheak-auth')

router.post('/singup', userController.users_create_user);

router.post('/login', userController.users_login_user);

router.delete('/:userId', cheakAuth , userController.users_delete_user);


module.exports = router;