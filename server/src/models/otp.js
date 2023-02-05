"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserOtp = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userOtpSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    expiresAt: {
        type: Number,
        required: true,
    },
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        },
    },
    timestamps: true,
});
userOtpSchema.statics.build = (attrs) => {
    return new exports.UserOtp(attrs);
};
exports.UserOtp = mongoose_1.default.model('UserOtp', userOtpSchema);
