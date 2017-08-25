const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const passport = require('passport');
const cors = require('cors');

const apiMiddlewares = require('./middlewares');
const apiControllers = require('./controllers/index');

require('./infrastructure/db');

const app = express();

passport.use(apiMiddlewares.jwtSecurity);

// add logger on the request
app.use(apiMiddlewares.loggingHandler());

app.use(logger('dev'));
app.use(compression());
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:8080',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
}));
app.use(bodyParser.json({ limit: 1024 * 1024 * 2, type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// routers
app.use('/api', apiControllers);

// catch 404 and forward to error handler
app.use(apiMiddlewares.notFoundHandler());
// Log errors
app.use(apiMiddlewares.errorLoggingHandler());
// error handler
app.use(apiMiddlewares.errorHandler());

module.exports = app;
