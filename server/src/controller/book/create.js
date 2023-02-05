"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBook = exports.addBookToPublisher = exports.addBookToAuthors = exports.validatePublisherId = exports.validateAuthorIds = void 0;
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const publisher_1 = require("../../models/publisher");
const author_1 = require("../../models/author");
const validateAuthorIds = (authorIds) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedAuthorIds = [];
    for (let i = 0; i < authorIds.length; i++) {
        const existingAuthor = yield author_1.Author.findById(authorIds[i]);
        if (existingAuthor) {
            validatedAuthorIds.push(authorIds[i]);
        }
    }
    if (validatedAuthorIds.length === 0) {
        throw new errors_1.NotFoundError('authors not found');
    }
    return validatedAuthorIds;
});
exports.validateAuthorIds = validateAuthorIds;
const validatePublisherId = (publisherId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPublisher = yield publisher_1.Publisher.findById(publisherId);
    if (!existingPublisher) {
        throw new errors_1.NotFoundError('publisher not found');
    }
    return publisherId;
});
exports.validatePublisherId = validatePublisherId;
const addBookToAuthors = (authorIds, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < authorIds.length; i++) {
        const existingAuthor = yield author_1.Author.findById(authorIds[i]);
        if (existingAuthor) {
            existingAuthor.booksId.push(bookId);
            yield existingAuthor.save();
        }
    }
});
exports.addBookToAuthors = addBookToAuthors;
const addBookToPublisher = (publisherId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPublisher = yield publisher_1.Publisher.findById(publisherId);
    if (existingPublisher) {
        existingPublisher.booksId.push(bookId);
        yield existingPublisher.save();
    }
});
exports.addBookToPublisher = addBookToPublisher;
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dateOfRelease, authorIds, publisherId, genre, about } = req.body;
    const validatedAuthorIds = yield (0, exports.validateAuthorIds)(authorIds);
    const validatedPublisherId = yield (0, exports.validatePublisherId)(publisherId);
    const book = book_1.Book.build({
        name,
        dateOfRelease,
        authorIds: validatedAuthorIds,
        publisherId: validatedPublisherId,
        genre,
        userId: req.currentUser.id,
        about,
    });
    yield book.save();
    yield (0, exports.addBookToAuthors)(validatedAuthorIds, book.id);
    yield (0, exports.addBookToPublisher)(validatedPublisherId, book.id);
    return res
        .status(200)
        .send({ book: yield book.populate(['authorIds', 'publisherId']) });
});
exports.createBook = createBook;
