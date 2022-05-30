const express = require('express');
const { container } = require('../di-setup');
const validate = require('../middlewares/validate');
const UserRegisterDto = require('../dto/Auth/userRegister');
const UserLoginDto = require('../dto/Auth/userLogin');


const authController = container.resolve('authController');

const router = express.Router();
router.get('/', authController.findByEmail);
router.post('/login' ,validate(UserLoginDto),authController.login);
router.post('/register',validate(UserRegisterDto), authController.register);


module.exports = router;