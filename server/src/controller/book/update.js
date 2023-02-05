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
exports.updateBook = exports.removeBookFromPublisher = exports.removeAuthorsFromBook = void 0;
const errors_1 = require("../../errors");
const author_1 = require("../../models/author");
const book_1 = require("../../models/book");
const publisher_1 = require("../../models/publisher");
const create_1 = require("./create");
const convert_arrayids_1 = require("../../utils/convert-arrayids");
const removeAuthorsFromBook = (authorIds, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < authorIds.length; i++) {
        const existingAuthor = yield author_1.Author.findById(authorIds[i]);
        if (existingAuthor) {
            const updatedBooksId = existingAuthor.booksId.filter((currentBookId) => currentBookId.toString() !== bookId);
            existingAuthor.booksId = updatedBooksId;
            yield existingAuthor.save();
        }
    }
});
exports.removeAuthorsFromBook = removeAuthorsFromBook;
const addBookToPublisher = (publisherId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPublisher = yield publisher_1.Publisher.findById(publisherId);
    if (existingPublisher) {
        existingPublisher.booksId.push(bookId);
        yield existingPublisher.save();
    }
});
const removeBookFromPublisher = (publisherId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingPublisher = yield publisher_1.Publisher.findById(publisherId);
    if (existingPublisher) {
        const updatedBookIds = existingPublisher.booksId.filter((currentBookId) => currentBookId.toString() !== bookId);
        existingPublisher.booksId = updatedBookIds;
        yield existingPublisher.save();
    }
});
exports.removeBookFromPublisher = removeBookFromPublisher;
const checkAreAuthorIdsEqual = (authorIds, existingAuthorsIds) => {
    const commonAuthorIds = existingAuthorsIds.filter((currentId) => authorIds.includes(currentId));
    if (commonAuthorIds.length === existingAuthorsIds.length) {
        return true;
    }
    return false;
};
const classifyAuthorIds = (authorIds, existingAuthorIds) => {
    const commonAuthorIds = existingAuthorIds.filter((currentId) => authorIds.includes(currentId.toString()));
    const newAuthorIds = authorIds.filter((authorId) => !commonAuthorIds.includes(authorId));
    const removedAuthorIds = existingAuthorIds.filter((currentId) => !commonAuthorIds.includes(currentId));
    return { commonAuthorIds, newAuthorIds, removedAuthorIds };
};
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dateOfRelease, authorIds, publisherId, genre, about } = req.body;
    const { bookid } = req.params;
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    if (existingBook.userId.toString() !== req.currentUser.id) {
        throw new errors_1.UnauthorizedError('you are not authorized to delete a book');
    }
    const existingAuthorIds = (0, convert_arrayids_1.convertEachArrayIdToString)(existingBook.authorIds);
    let finalAuthorIds = existingAuthorIds;
    if (!checkAreAuthorIdsEqual(authorIds, existingAuthorIds)) {
        const { newAuthorIds, commonAuthorIds, removedAuthorIds } = classifyAuthorIds(authorIds, existingAuthorIds);
        const validatedNewAuthorIds = yield (0, create_1.validateAuthorIds)(newAuthorIds);
        yield (0, create_1.addBookToAuthors)(validatedNewAuthorIds, bookid);
        yield (0, exports.removeAuthorsFromBook)(removedAuthorIds, bookid);
        finalAuthorIds = [...validatedNewAuthorIds, ...commonAuthorIds];
    }
    const validatedPublisherId = yield (0, create_1.validatePublisherId)(publisherId);
    if (validatedPublisherId !== existingBook.publisherId.toString()) {
        yield addBookToPublisher(validatedPublisherId, existingBook.id);
        yield (0, exports.removeBookFromPublisher)(existingBook.publisherId.toString(), existingBook.id);
    }
    existingBook.set({
        name,
        dateOfRelease,
        authorIds: finalAuthorIds,
        publisherId: validatedPublisherId,
        genre,
        about,
    });
    yield existingBook.save();
    return res
        .status(200)
        .send({ book: yield existingBook.populate(['authorIds', 'publisherId']) });
});
exports.updateBook = updateBook;
