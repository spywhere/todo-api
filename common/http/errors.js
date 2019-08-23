const http = require("./");

class HTTPError extends Error {
    constructor(message, statusCode, errorCode) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
    }
}

class InternalError extends HTTPError {
    constructor(error, message, statusCode, errorCode) {
        super(message, statusCode || error.statusCode, errorCode);
        this.error = error;
    }
}

class NotFoundError extends HTTPError {
    constructor(message, errorCode) {
        super(message, http.code.notFound, errorCode);
    }
}

class BadRequestError extends HTTPError {
    constructor(message, errorCode) {
        super(message, http.code.badRequest, errorCode);
    }
}

class ForbiddenError extends HTTPError {
    constructor(message, errorCode) {
        super(message, http.code.forbidden, errorCode);
    }
}

class ServerError extends HTTPError {
    constructor(message, errorCode) {
        super(message, http.code.serverError, errorCode);
    }
}

function convertToHTTPResponse(error) {
    if (error instanceof HTTPError) {
        return {
            status: error.statusCode,
            body: {
                statusCode: error.statusCode || undefined,
                message: error.message || undefined,
                code: error.errorCode || undefined
            }
        };
    }

    return {
        status: http.code.serverError,
        body: (process.env.NODE_ENV === "production" ? undefined : {
            name: error.name || undefined,
            message: error.message || undefined,
            stack: error.stack || undefined
        })
    };
}

module.exports.HTTPError = HTTPError;
module.exports.InternalError = InternalError;
module.exports.NotFoundError = NotFoundError;
module.exports.ForbiddenError = ForbiddenError;
module.exports.BadRequestError = BadRequestError;
module.exports.ServerError = ServerError;
module.exports.convertToHTTPResponse = convertToHTTPResponse;
