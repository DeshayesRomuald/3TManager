const mongoose = require('mongoose');
const config = require('../config');
const logger = require('./loggerConfig');

mongoose.connect(config.mongo, { server: { reconnectTries: Number.MAX_VALUE } });

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
    logger.info('Connected to mongodb');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
    logger.error('MongoDb error', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', (err) => {
    logger.error('MongoDb disconnected', err);
});
