"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const rating_1 = require("../controller/rating");
const middlewares_1 = require("../middlewares");
exports.ratingRouter = (0, express_1.Router)();
exports.ratingRouter.post('/:bookid/create', middlewares_1.requireAuth, [
    (0, express_validator_1.body)('rating')
        .exists()
        .notEmpty()
        .custom((rating) => Number.isInteger(rating) && rating >= 1 && rating <= 10)
        .withMessage('rating has to be between 1 to 10'),
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, rating_1.createRating);
exports.ratingRouter.put('/:bookid/:ratingid', [
    (0, express_validator_1.body)('rating')
        .exists()
        .notEmpty()
        .isFloat({ min: 1, max: 10 })
        .withMessage('rating has to be between 1 to 10'),
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
    (0, express_validator_1.param)('ratingid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, middlewares_1.requireAuth, rating_1.updateRating);
exports.ratingRouter.get('/:bookid/all', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, rating_1.allRatings);
