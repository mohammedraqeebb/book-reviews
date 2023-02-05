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
exports.forgotPassword = void 0;
const nodemailer_1 = require("../../utils/nodemailer");
const user_1 = require("../../models/user");
const otp_1 = require("../../models/otp");
const errors_1 = require("../../errors");
const generateOtp = () => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return parseInt(otp);
};
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const existingUser = yield user_1.User.findOne({ email });
    if (!existingUser) {
        throw new errors_1.NotFoundError('user not found, create an account');
    }
    const existingOtp = yield otp_1.UserOtp.findOne({ email });
    if (existingOtp) {
        const hasTimeElapsed = new Date().getTime() - existingOtp.expiresAt > 0;
        if (!hasTimeElapsed) {
            throw new errors_1.BadRequestError('too soon,try again after some time');
        }
        yield otp_1.UserOtp.findByIdAndDelete(existingUser.id);
    }
    const otp = generateOtp();
    const userOtp = otp_1.UserOtp.build({
        _id: existingUser.id,
        email,
        expiresAt: new Date().getTime() + 120 * 1000,
        otp,
    });
    yield userOtp.save();
    (0, nodemailer_1.sendMail)({ to: email, otp: userOtp.otp });
    return res.status(200).send({ message: 'otp sent' });
});
exports.forgotPassword = forgotPassword;
