"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const errors_1 = require("../errors");
const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new errors_1.NotAuthenticatedError('you have to be logged in');
    }
    next();
};
exports.requireAuth = requireAuth;
