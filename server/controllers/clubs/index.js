const express = require('express');

const router = express.Router();

const playersClubController = require('./players/playersClubController');

router.use('/players', playersClubController);

module.exports = router;
