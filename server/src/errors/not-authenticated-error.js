"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthenticatedError = void 0;
const custom_error_1 = require("./custom-error");
class NotAuthenticatedError extends custom_error_1.CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
        Object.setPrototypeOf(this, NotAuthenticatedError.prototype);
    }
    serializeError() {
        return [{ message: 'you are not signed in' }];
    }
}
exports.NotAuthenticatedError = NotAuthenticatedError;
