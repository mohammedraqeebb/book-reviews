"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRouter = void 0;
const most_liked_1 = require("./../controller/book/most-liked");
const express_1 = require("express");
const book_1 = require("../controller/book");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const validate_date_1 = require("../utils/validate-date");
const validate_ids_1 = require("../utils/validate-ids");
const book_2 = require("../models/book");
const likes_1 = require("../controller/book/likes");
exports.bookRouter = (0, express_1.Router)();
exports.bookRouter.post('/create', middlewares_1.requireAuth, [
    (0, express_validator_1.body)('name')
        .exists()
        .trim()
        .isLength({ min: 1 })
        .withMessage('name cannot be empty'),
    (0, express_validator_1.body)('dateOfRelease')
        .exists()
        .trim()
        .custom((date) => (0, validate_date_1.validateDate)(date))
        .withMessage('enter valid date'),
    (0, express_validator_1.body)('about')
        .exists()
        .isLength({ min: 50, max: 300 })
        .withMessage('about should atleast contain 50 and atmost 300 characters'),
    (0, express_validator_1.body)('authorIds')
        .exists()
        .custom((authorIds) => authorIds.length <= 8 && (0, validate_ids_1.validateIds)(authorIds))
        .withMessage('maximum eight authors allowed and enter valid object id'),
    (0, express_validator_1.body)('publisherId')
        .exists()
        .custom((publisherId) => (0, middlewares_1.isValidObjectId)(publisherId))
        .withMessage('enter valid object id'),
    (0, express_validator_1.body)('genre')
        .exists()
        .custom((genre) => book_2.Genre.includes(genre))
        .withMessage('enter valid genre value'),
], middlewares_1.validateRequest, book_1.createBook);
exports.bookRouter.put('/:bookid', middlewares_1.requireAuth, [
    (0, express_validator_1.body)('name')
        .exists()
        .trim()
        .isLength({ min: 1 })
        .withMessage('name cannot be empty'),
    (0, express_validator_1.body)('dateOfRelease')
        .exists()
        .trim()
        .custom((date) => (0, validate_date_1.validateDate)(date))
        .withMessage('enter valid date'),
    (0, express_validator_1.body)('about')
        .exists()
        .isLength({ min: 50, max: 300 })
        .withMessage('about should atleast contain 50 and atmost 300 characters'),
    (0, express_validator_1.body)('authorIds')
        .exists()
        .custom((authorIds) => authorIds.length <= 8 && (0, validate_ids_1.validateIds)(authorIds))
        .withMessage('maximum eight authors allowed and enter valid object id'),
    (0, express_validator_1.body)('publisherId')
        .exists()
        .custom((publisherId) => (0, middlewares_1.isValidObjectId)(publisherId))
        .withMessage('enter valid object id'),
    (0, express_validator_1.body)('genre')
        .exists()
        .custom((genre) => book_2.Genre.includes(genre))
        .withMessage('enter valid genre value'),
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, book_1.updateBook);
exports.bookRouter.post('/:bookid', middlewares_1.requireAuth, [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, book_1.deleteBook);
exports.bookRouter.get('/:bookid', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, book_1.readBook);
exports.bookRouter.post('/:bookid/view', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, book_1.increaseView);
exports.bookRouter.post('/:bookid/like/:variant', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
    (0, express_validator_1.param)('variant')
        .exists()
        .custom((variant) => variant === 'add' || variant === 'remove')
        .withMessage('enter valid type value'),
], middlewares_1.validateRequest, likes_1.LikeOrRemoveLike);
exports.bookRouter.post('/:bookid/dislike/:variant', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
    (0, express_validator_1.param)('variant')
        .exists()
        .custom((variant) => variant === 'add' || variant === 'remove')
        .withMessage('enter valid type value'),
], middlewares_1.validateRequest, book_1.dislikeOrRemoveDislike);
exports.bookRouter.post('/search/all', [
    (0, express_validator_1.body)('bookSearchField')
        .exists()
        .withMessage('book search field cannot be empty'),
], middlewares_1.validateRequest, book_1.searchBook);
exports.bookRouter.get('/likes/mostliked', most_liked_1.mostLiked);
