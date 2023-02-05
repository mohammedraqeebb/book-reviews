"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const errors_1 = require("../errors");
const transporter = nodemailer_1.default.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.NODEMAILER_SENDER_EMAIL,
        pass: process.env.NODEMAILER_SENDER_EMAIL_PASSWORD,
    },
});
const sendMail = ({ to, otp }) => {
    const options = {
        from: 'mohammedraqeeb999@outlook.com',
        to,
        subject: 'forgotten password,OTP',
        text: false,
        html: `<h3>Hey there from Book Review</h3>
    <p >Your otp is <span>${otp}</span></p>
            <style> span { color: red; }
            </style>`,
    };
    //@ts-ignore
    transporter.sendMail(options, function (err, info) {
        if (err) {
            throw new errors_1.BadRequestError('your email, was not sent,enter existing email');
        }
    });
    return;
};
exports.sendMail = sendMail;
