const express = require('express');
const passport = require('passport');

const router = express.Router();

const validateContent = require('../../../middlewares/validateContent');

const playersClubService = require('../../../services/playersClubService');


router.get('/list',
    // passport.authenticate('jwt', { session: false }),
    playersClubService.listPlayers);

// router.post('/quote',
//     passport.authenticate('jwt', { session: false }),
//     validateContent(createQuoteValidator),
//     carContractSpecificationsService.createQuote);

// todo route to get price estimation
module.exports = router;
