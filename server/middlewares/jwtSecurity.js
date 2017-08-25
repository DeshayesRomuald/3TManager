const passportJWT = require('passport-jwt');

const repositories = require('../repositories');
const config = require('../config');

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[config.jwtCookie];
    }
    return token;
};

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.jwtSecret
};

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
    repositories.usersRepository.findById(jwtPayload.id)
        .then((user) => {
            if (!user || user.uniqueId !== jwtPayload.uniqueId) {
                return next(null, false);
            }

            return next(null, user);
        })
        .catch(err => next(err));
});


module.exports = strategy;
