const express = require('express');
const router = express.Router();
const { register } = require('../controllers/authController');
const { login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
// router.post('/login', authController.login);

module.exports = router;