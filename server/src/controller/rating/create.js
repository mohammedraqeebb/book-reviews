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
exports.createRating = void 0;
const rating_1 = require("../../models/rating");
const book_ratings_1 = require("../../models/book-ratings");
const errors_1 = require("../../errors");
const book_1 = require("../../models/book");
const createRating = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookid } = req.params;
    const { rating: userRating } = req.body;
    const existingBook = yield book_1.Book.findById(bookid);
    if (!existingBook) {
        throw new errors_1.NotFoundError('book not found');
    }
    const rating = rating_1.Rating.build({
        rating: userRating,
        userId: req.currentUser.id,
        bookId: existingBook.id.toString(),
    });
    yield rating.save();
    let bookRatings = yield book_ratings_1.BookRatings.findById(bookid).populate('ratings');
    if (!bookRatings) {
        const newBookRatings = book_ratings_1.BookRatings.build({
            id: bookid,
            ratings: [rating.id],
        });
        yield newBookRatings.save();
        return res.status(201).send({ bookRatings: newBookRatings });
    }
    else if (bookRatings) {
        const userRatingFound = bookRatings.ratings.find(
        //@ts-ignore
        (currentBookRating) => currentBookRating.userId.toString() === req.currentUser.id);
        if (userRatingFound) {
            throw new errors_1.BadRequestError('only one rating allowed per user');
        }
        bookRatings.ratings.push(rating.id);
        yield bookRatings.save();
    }
    res.status(201).send({ bookRatings });
});
exports.createRating = createRating;
