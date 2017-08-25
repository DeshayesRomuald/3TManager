
const express = require('express');

const router = express.Router();

const usersController = require('./usersController');

router.use('/', usersController);

module.exports = router;
