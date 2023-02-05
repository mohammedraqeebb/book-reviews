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
exports.createAuthor = void 0;
const author_1 = require("../../models/author");
const createAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, dateOfBirth, gender, bio } = req.body;
    const author = author_1.Author.build({
        name,
        dateOfBirth,
        gender,
        bio,
        userId: req.currentUser.id,
    });
    yield author.save();
    return res.status(201).send({ author });
});
exports.createAuthor = createAuthor;
