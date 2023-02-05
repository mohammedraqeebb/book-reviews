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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allRatings = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_ratings_1 = require("../../models/book-ratings");
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const allRatings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(bookid)) {
        throw new errors_1.BadRequestError('valid bookid is required');
    }
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    const bookRatings = yield book_ratings_1.BookRatings.findById(bookid).populate('ratings');
    if (!bookRatings) {
        return res.status(200).send({ bookRatings: [] });
    }
    res.status(200).send({ bookRatings: bookRatings });
});
exports.allRatings = allRatings;
