"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.savedBooksRouter = void 0;
const saved_books_1 = require("../controller/saved-books");
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
exports.savedBooksRouter = (0, express_1.Router)();
exports.savedBooksRouter.post('/:bookid/create', middlewares_1.requireAuth, [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, saved_books_1.addBook);
exports.savedBooksRouter.post('/all', middlewares_1.requireAuth, saved_books_1.allSavedBooks);
exports.savedBooksRouter.post('/:bookid/delete', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, saved_books_1.deleteBook);
