"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const comment_1 = require("../controller/comment");
const middlewares_1 = require("../middlewares");
exports.commentRouter = (0, express_1.Router)();
exports.commentRouter.post('/:bookid/create', middlewares_1.requireAuth, [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
    (0, express_validator_1.body)('comment').exists().notEmpty().withMessage('comment required'),
], middlewares_1.validateRequest, comment_1.createComment);
exports.commentRouter.post('/:bookid/all', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid book id is required'),
], middlewares_1.validateRequest, comment_1.allComments);
exports.commentRouter.put('/:bookid/:commentid/edit', middlewares_1.requireAuth, [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid bookid id is required'),
    (0, express_validator_1.param)('commentid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid comment id is required'),
    (0, express_validator_1.body)('comment').exists().notEmpty().withMessage('comment required'),
], middlewares_1.validateRequest, comment_1.updateComment);
exports.commentRouter.post('/:bookid/:commentid/delete', [
    (0, express_validator_1.param)('bookid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
    (0, express_validator_1.param)('commentid')
        .exists()
        .custom((id) => (0, middlewares_1.isValidObjectId)(id))
        .withMessage('valid author id is required'),
], middlewares_1.validateRequest, middlewares_1.requireAuth, comment_1.deleteComment);
