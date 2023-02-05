"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publisherRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const publisher_1 = require("../controller/publisher");
const middlewares_1 = require("../middlewares");
const validate_date_1 = require("../utils/validate-date");
exports.publisherRouter = (0, express_1.Router)();
exports.publisherRouter.post('/create', middlewares_1.requireAuth, [
    (0, express_validator_1.body)('name').exists().trim().notEmpty().withMessage('name cannot be empty'),
    (0, express_validator_1.body)('bio')
        .exists()
        .trim()
        .notEmpty()
        .isLength({ min: 50, max: 1000 })
        .withMessage('bio should be atleast 100 and atmost 1000 characters'),
    (0, express_validator_1.body)('establishedDate')
        .exists()
        .custom((date) => (0, validate_date_1.validateDate)(date))
        .withMessage('enter valid date'),
    (0, express_validator_1.body)('street')
        .exists()
        .trim()
        .notEmpty()
        .withMessage('street cannot be empty'),
    (0, express_validator_1.body)('state')
        .exists()
        .trim()
        .notEmpty()
        .withMessage('state cannot be empty'),
    (0, express_validator_1.body)('country')
        .exists()
        .trim()
        .notEmpty()
        .withMessage('country cannot be empty'),
    (0, express_validator_1.body)('countryCode')
        .exists()
        .trim()
        .notEmpty()
        .withMessage('country code cannot be empty'),
    (0, express_validator_1.body)('phoneNumber')
        .exists()
        .trim()
        .notEmpty()
        .withMessage('phone number code cannot be empty'),
], middlewares_1.validateRequest, publisher_1.createPublisher);
exports.publisherRouter.get('/:publisherid', [
    (0, express_validator_1.param)('publisherid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, publisher_1.readPublisher);
exports.publisherRouter.post('/search', middlewares_1.requireAuth, [
    (0, express_validator_1.body)('searchPublisherField')
        .exists()
        .trim()
        .isLength({ min: 1 })
        .withMessage('search author term is required'),
], middlewares_1.validateRequest, publisher_1.searchPublisher);
