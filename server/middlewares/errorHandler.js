module.exports = () => (err, req, res, next) => {
    let error;
    if (req.app.get('env') === 'development') {
        error = err;
        // console.log(JSON.stringify(err));
    }

    // for security reason
    if (err.name === 'ApiError') {
        err.details = null;
    }

    res.status(err.status || 500);

    if (req.xhr || (req.headers['content-type'] && req.headers['content-type'].indexOf('json') > -1)) {
        res.json({
            status: err.status || 500,
            message: err.message,
            error,
            details: err.details,
            code: err.code
        });
    } else {
        next(err);
    }
};
