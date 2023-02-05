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
exports.mostLiked = void 0;
const book_1 = require("../../models/book");
const mostLiked = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_1.Book.find({})
        .sort({ 'likes.length': -1 })
        .populate('authorIds')
        .limit(10);
    //   Book.aggregate([
    //      {
    //         $lookup: {
    //            from: 'users',
    //            localField: 'likes',
    //            foreignField: '_id',
    //             as: 'likes',
    //          },
    //       },
    //     { $unwind: '$likes' },
    //     {
    //         $group: {
    //            _id: '$_id',
    //            likes: { $sum: 1 },
    //          },
    //     },
    //     { $sort: { likes: -1 } },
    //    ])
    return res.status(200).send({ books });
});
exports.mostLiked = mostLiked;
