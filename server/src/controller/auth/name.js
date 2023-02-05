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
exports.userName = void 0;
const errors_1 = require("../../errors");
const user_1 = require("../../models/user");
const userName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.User.findById(req.body.userId);
    if (!user) {
        throw new errors_1.NotFoundError('user not found');
    }
    return res.status(200).send({ name: user.name, email: user.email });
});
exports.userName = userName;
