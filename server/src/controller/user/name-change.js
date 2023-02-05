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
exports.userNameChange = void 0;
const errors_1 = require("../../errors");
const user_1 = require("../../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userNameChange = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_1.User.findById(req.currentUser.id);
    if (!existingUser) {
        throw new errors_1.NotFoundError('user not found');
    }
    const { name } = req.body;
    existingUser.set({ name });
    yield existingUser.save();
    const token = jsonwebtoken_1.default.sign({
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
    }, process.env.JWT_SECRET);
    req.session = {
        jwt: token,
    };
    return res.status(200).send({ user: existingUser });
});
exports.userNameChange = userNameChange;
