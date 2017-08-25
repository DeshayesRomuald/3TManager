function NotFoundError(message) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = message;
    this.status = 404;
    this.code = 'ENTITY_NOT_FOUND';
    this.name = 'Validation';
}

function ValidationError(message, code, details) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = message;
    this.status = 400;
    this.name = 'Validation';
    this.code = code;
    this.details = details;
}

function ApiError(message, details) {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = message;
    this.status = 500;
    this.name = 'ApiError';
    this.details = details;
}

function AuthenticationError() {
    Error.call(this);
    Error.captureStackTrace(this, arguments.callee);
    this.message = 'Incorrect email/password';
    this.status = 401;
    this.name = 'Security error';
}

module.exports = {
    NotFoundError,
    ValidationError,
    ApiError,
    AuthenticationError
};
