module.exports = () => (err, req, res, next) => {
    const reqDetails = {
        url: req.originalUrl,
        cookies: req.cookies,
        params: req.params,
        body: JSON.stringify(req.body, null, 4),
        query: req.query
    };

    if (req.user) {
        reqDetails.user = {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name
        };
    }

    const errorDetails = {
        error: {
            data: err,
            stack: err.stack
        },
        req: reqDetails
    };


    if (err.code) {
        req.logger.warn(err.message, errorDetails);
    } else if (err.status === 404 || err.status === 401 || err.status === 402) {
        req.logger.warn(err.message, errorDetails);
    } else {
        req.logger.error(err.message, errorDetails);
    }

    next(err);
};
