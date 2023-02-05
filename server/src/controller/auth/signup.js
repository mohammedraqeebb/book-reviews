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
exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../models/user");
const user_2 = require("../../models/user");
const errors_1 = require("../../errors");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_2.User.findOne({ email: req.body.email });
    if (existingUser) {
        throw new errors_1.BadRequestError('email exists, try signing in');
    }
    const user = user_2.User.build(req.body);
    user.set({ type: user_1.SigninType.EmailAndPassword });
    yield user.save();
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET);
    req.session = {
        jwt: token,
    };
    return res.status(201).send({ user });
});
exports.signup = signup;
