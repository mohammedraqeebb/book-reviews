"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorRouter = void 0;
const express_1 = require("express");
const author_1 = require("../controller/author");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const validate_date_1 = require("../utils/validate-date");
exports.authorRouter = (0, express_1.Router)();
exports.authorRouter.post('/create', middlewares_1.requireAuth, [
    (0, express_validator_1.body)('name').exists().notEmpty().trim().withMessage('name cannot be empty'),
    (0, express_validator_1.body)('dateOfBirth')
        .exists()
        .trim()
        .custom((date) => (0, validate_date_1.validateDate)(date))
        .withMessage('enter proper date format'),
    (0, express_validator_1.body)('gender')
        .exists()
        .trim()
        .custom((gender) => gender === 'male' || gender === 'female')
        .withMessage('enter valid gender'),
    (0, express_validator_1.body)('bio')
        .exists()
        .notEmpty()
        .trim()
        .isLength({ min: 50, max: 1000 })
        .withMessage('bio should be atleast 50 characters and atmost 1000'),
], middlewares_1.validateRequest, author_1.createAuthor);
exports.authorRouter.get('/:authorid', [
    (0, express_validator_1.param)('authorid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, author_1.readAuthor);
exports.authorRouter.post('/search', middlewares_1.requireAuth, [
    (0, express_validator_1.body)('searchAuthorField')
        .exists()
        .trim()
        .isLength({ min: 1 })
        .withMessage('search author term is required'),
], middlewares_1.validateRequest, author_1.searchAuthor);
