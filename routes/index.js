const express = require('express');

const authController = require('../controllers/auth');
const indexController = require('../controllers/index');

const router = express.Router();

router.get('/', indexController.showIndex());

module.exports = router;