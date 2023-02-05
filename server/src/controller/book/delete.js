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
exports.deleteBook = void 0;
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const update_1 = require("./update");
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid } = req.params;
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    if (existingBook.userId.toString() !== req.currentUser.id) {
        throw new errors_1.UnauthorizedError('you are not authorized to do this');
    }
    yield (0, update_1.removeAuthorsFromBook)(existingBook.authorIds, existingBook.id.toString());
    yield (0, update_1.removeBookFromPublisher)(existingBook.publisherId.toString(), existingBook.id.toString());
    yield book_1.Book.findByIdAndDelete(bookid);
    return res.status(200).send({});
});
exports.deleteBook = deleteBook;
