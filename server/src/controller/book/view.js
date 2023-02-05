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
exports.increaseView = void 0;
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const user_1 = require("../../models/user");
const addViewForBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    book.set({ views: book.views + 1 });
    yield book.save();
    return;
});
const addBookViewForUser = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.User.findById(userId);
    if (existingUser) {
        const bookViewsIds = existingUser.bookViewsIds;
        const bookIdFound = bookViewsIds.find((currentBookViewId) => currentBookViewId.toString() === bookId);
        if (!bookIdFound) {
            existingUser.bookViewsIds.unshift(bookId);
            yield existingUser.save();
        }
        else {
            const filteredBookViewsIds = bookViewsIds.filter((currentBookViewId) => currentBookViewId.toString() !== bookId);
            const newFilteredViewsIds = [bookId, ...filteredBookViewsIds];
            existingUser.bookViewsIds = newFilteredViewsIds;
            yield existingUser.save();
        }
    }
    return;
});
const increaseView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid } = req.params;
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('not found error');
    }
    if (req.currentUser) {
        yield Promise.all([
            addViewForBook(existingBook),
            addBookViewForUser(req.currentUser.id, bookid),
        ]);
        return res.status(201).send({});
    }
    yield addViewForBook(existingBook);
    return res.status(201).send({});
});
exports.increaseView = increaseView;
