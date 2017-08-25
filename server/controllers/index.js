const express = require('express');

const router = express.Router();

const clubsController = require('./clubs');
const contractsController = require('./contracts');
const usersController = require('./users');

router.use('/clubs', clubsController);
router.use('/contracts', contractsController);
router.use('/users', usersController);

module.exports = router;
