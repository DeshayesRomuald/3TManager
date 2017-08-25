const jwt = require('jsonwebtoken');
const repositories = require('../repositories');
const errorsBuilder = require('../utils/errorsBuilder');
const config = require('../config');
const User = require('../models/user');


const info = (req, res) => res.json(req.user);

const login = (req, res, next) => {
    repositories.usersRepository.findByEmail(req.body.email.toLowerCase())
        .then((user) => {
            let userToCheck = user;

            if (!user) {
                // fake user to simulate bcrypt hash compare for better security
                userToCheck = new User({ password: '$2a$06$Id9U2fUpnvEgMUhxRlqzPuUdG6.8q27h79G5kWb/tX28NNSp7FQiW' });
            }

            return userToCheck.comparePassword(req.body.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return next(new errorsBuilder.AuthenticationError());
                    }

                    const payload = {
                        id: user._id,
                        uniqueId: user.uniqueId
                    };

                    const token = jwt.sign(payload, config.jwtSecret);

                    return res.json({ user, token });
                });
        })
        .catch(err => next(err));
};

const logout = (req, res, next) => {
    req.user.uniqueId = null;

    repositories.usersRepository.save(req.user)
        .then(() => res.sendStatus(200))
        .catch((err) => next(err));
};

module.exports = {
    login,
    logout,
    info
};
