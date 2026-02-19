const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');

router.post('/register', register);
// router.post('/login', authController.login);

module.exports = router;