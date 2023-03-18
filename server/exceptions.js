const HttpStatus = require('http-status-codes').StatusCodes;
const ExpressHTTPError = require('http-errors').HttpError;

function convertError(err) {
    if (err instanceof ApplicationError) return err;
    if (err.expose && err.statusCode < 500 && (err instanceof ExpressHTTPError || typeof err.type === 'string')) {
        return new ApplicationError(err.statusCode, { name: err.type, message: err.message, cause: err });
    }
    return new InternalServerError({ cause: err });
}

function prettyStack(stack) {
    if (!stack || typeof stack.split !== 'function') {
        return stack;
    }
    return stack.split('\n');
}

function inflateError(err) {
    if (!err || typeof err !== 'object' || typeof err.toJSON === 'function') {
        return err;
    }
    return { message: err.message, stack: prettyStack(err.stack), ...err };
}

class ApplicationError extends Error {
    constructor(statusCode, { name, message, details, cause } = {}) {
        super(message);
        this.name = name;
        this.details = details;
        this.cause = cause;
        this.statusCode = statusCode;
    }
    toJSON({ includeInternal = false } = {}) {
        return {
            name: this.name || this.constructor.name,
            message: this.message,
            details: this.details,
            ...(includeInternal && {
                stack: prettyStack(this.stack),
                cause: inflateError(this.cause),
            })
        };
    }
}

// Exported errors

class InternalServerError extends ApplicationError {
    constructor({ message, cause } = {}) {
        super(HttpStatus.INTERNAL_SERVER_ERROR, {
            message: message || 'Unexpected internal error',
            cause
        });
    }
}

class InvalidParams extends ApplicationError {
    constructor(validationResult) {
        super(HttpStatus.BAD_REQUEST, {
            message: `Invalid parameters: ${validationResult.formatWith(({ param }) => param).array().join()}`,
            details: validationResult.formatWith(({ msg }) => msg).mapped()
        });
        this.validationResult = validationResult;
    }
}

module.exports = {
    convertError,

    InternalServerError,
    InvalidParams,
};

