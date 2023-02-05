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
exports.currentUser = void 0;
const errors_1 = require("../../errors");
const user_1 = require("../../models/user");
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.User.findById(req.currentUser.id).populate([
        'bookViewsIds',
        'bookLikesIds',
    ]);
    if (!existingUser) {
        throw new errors_1.NotFoundError('user not found');
    }
    return res.status(200).send({ user: existingUser });
});
exports.currentUser = currentUser;
