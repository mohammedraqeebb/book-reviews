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
exports.readBook = void 0;
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const readBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid } = req.params;
    const existingBook = yield book_1.Book.findById(bookid).populate([
        'authorIds',
        'publisherId',
        // 'ratings',
    ]);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    return res.status(200).send({ book: existingBook });
});
exports.readBook = readBook;
