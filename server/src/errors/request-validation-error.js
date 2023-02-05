"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(error) {
        super('invalid request parameters');
        this.error = error;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeError() {
        return this.error.map((currentError) => {
            const { msg, param } = currentError;
            return { message: msg, field: param };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
