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
exports.googleSignin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = require("../../errors");
const user_1 = require("../../models/user");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const user_2 = require("../../models/user");
const googleSignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    const decoded = (0, jwt_decode_1.default)(token);
    const existingUser = yield user_1.User.findOne({ email: decoded.email });
    if (existingUser && existingUser.type === user_2.SigninType.EmailAndPassword) {
        res.send({
            user: existingUser,
            message: 'you already have an account with this email, enter your password to connect with your google account',
        });
    }
    let user;
    if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.type) === user_2.SigninType.Both) {
        user = yield user_1.User.findOne({ email: decoded.email });
    }
    else if (!existingUser) {
        user = user_1.User.build({
            name: decoded.name,
            email: decoded.email,
            password: 'secretttt',
            type: user_2.SigninType.Google,
        });
        yield user.save();
    }
    if (!user) {
        throw new errors_1.BadRequestError('user not found');
    }
    const jwtToken = jsonwebtoken_1.default.sign({
        id: user._id,
        email: decoded.email,
        name: decoded.name,
    }, process.env.JWT_SECRET);
    req.session = {
        jwt: jwtToken,
    };
    return res.send({ user });
});
exports.googleSignin = googleSignin;
