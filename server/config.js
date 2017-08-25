module.exports = {
    mongo: process.env.MONGO || 'mongodb://localhost:27017/interview',
    jwtSecret: process.env.JWT_SECRET || 'R43x9CZe9X331^6iG9t!',
    jwtCookie: 'authorization-token'
};
