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
exports.changePassword = void 0;
const errors_1 = require("../../errors");
const user_1 = require("../../models/user");
const password_manager_1 = require("../../utils/password-manager");
const otp_1 = require("../../models/otp");
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    const existingOtp = yield otp_1.UserOtp.findOne({ email });
    if (!existingUser) {
        throw new errors_1.BadRequestError('user does not exist');
    }
    if (!existingOtp) {
        throw new errors_1.BadRequestError('you are not allowed');
    }
    const samePassword = yield password_manager_1.PasswordManager.comparePassword(password, existingUser.password);
    if (samePassword) {
        throw new errors_1.BadRequestError('enter new password');
    }
    const currentTime = new Date().getTime();
    const otpIssuedTimePlusOneMinute = existingOtp.expiresAt + 60 * 1000;
    if (currentTime - otpIssuedTimePlusOneMinute > 0) {
        throw new errors_1.BadRequestError('sorry, you tried too late');
    }
    existingUser.set({ password });
    yield existingUser.save();
    return res.status(200).send({ message: 'password updated' });
});
exports.changePassword = changePassword;
