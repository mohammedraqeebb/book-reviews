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
exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const user_1 = require("../../models/user");
const password_manager_1 = require("../../utils/password-manager");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('sign in hit');
    const { email, password, type } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (!existingUser) {
        throw new errors_1.BadRequestError('email does not exist,try signing in');
    }
    const checkPassword = yield password_manager_1.PasswordManager.comparePassword(password, existingUser.password);
    console.log(checkPassword);
    if (!checkPassword) {
        throw new errors_1.BadRequestError('password is incorrect');
    }
    if (type === user_1.SigninType.Google) {
        existingUser.set({ type: user_1.SigninType.Both });
        yield existingUser.save();
    }
    const token = jsonwebtoken_1.default.sign({
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
    }, process.env.JWT_SECRET);
    req.session = {
        jwt: token,
    };
    console.log('done');
    return res.status(202).send({ user: existingUser });
});
exports.signin = signin;
