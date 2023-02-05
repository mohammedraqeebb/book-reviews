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
exports.verifyotp = void 0;
const errors_1 = require("../../errors");
const otp_1 = require("../../models/otp");
const verifyotp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    const userOtp = yield otp_1.UserOtp.findOne({ email });
    if (!userOtp) {
        throw new errors_1.BadRequestError('otp expired, try again after a minute');
    }
    const hasTimeElapsed = new Date().getTime() - userOtp.expiresAt > 0;
    if (hasTimeElapsed) {
        throw new errors_1.BadRequestError('time expired, try again');
    }
    if (parseInt(otp) !== userOtp.otp) {
        throw new errors_1.BadRequestError('wrong otp');
    }
    return res.status(200).send({});
});
exports.verifyotp = verifyotp;
