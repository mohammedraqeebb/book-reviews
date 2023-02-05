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
exports.allSavedBooks = void 0;
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const user_1 = require("../../models/user");
const allSavedBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.User.findById(req.currentUser.id);
    if (!existingUser) {
        throw new errors_1.NotFoundError('user not found');
    }
    const savedBookIds = existingUser.savedBookIds;
    const savedBooks = [];
    for (let i = 0; i < savedBookIds.length; i++) {
        const book = yield book_1.Book.findById(savedBookIds[i]).populate('authorIds publisherId');
        if (!book) {
            continue;
        }
        savedBooks.push(book);
    }
    return res
        .status(200)
        .send({ name: req.currentUser.name, savedBooks: savedBooks });
});
exports.allSavedBooks = allSavedBooks;
