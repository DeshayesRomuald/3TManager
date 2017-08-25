const express = require('express');
const passport = require('passport');

const router = express.Router();

const validateContent = require('../../middlewares/validateContent');

const userLoginValidator = require('./validators/userLoginValidator');
const usersService = require('../../services/usersService');

router.post('/login',
    validateContent(userLoginValidator),
    usersService.login);

router.post('/logout',
    passport.authenticate('jwt', { session: false }),
    usersService.logout);

router.get('/',
    passport.authenticate('jwt', { session: false }),
    usersService.info);

module.exports = router;
