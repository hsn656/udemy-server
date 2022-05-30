const express = require('express');
const { container } = require('../di-setup');
const AuthController = require('../controller/auth');

const authController = container.resolve('authController');

const router = express.Router();
router.get('/', authController.getUsers);

module.exports = router;