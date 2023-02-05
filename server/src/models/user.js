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
exports.User = exports.SigninType = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const password_manager_1 = require("../utils/password-manager");
var SigninType;
(function (SigninType) {
    SigninType["Google"] = "googlesignin";
    SigninType["Both"] = "both";
    SigninType["EmailAndPassword"] = "emailandpassword";
})(SigninType = exports.SigninType || (exports.SigninType = {}));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBanned: {
        type: Boolean,
        default: false,
    },
    signinType: {
        type: String,
        enum: Object.values(SigninType),
    },
    bookViewsIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    bookLikesIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    bookDisLikesIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
    savedBookIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book',
        },
    ],
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret.password;
            delete ret._id;
            delete ret.isVerified;
            delete ret.__v;
            delete ret.isBanned;
            delete ret.bookDisLikesIds;
            delete ret.bookLikesIds;
            delete ret.bookViewsIds;
            delete ret.savedBookIds;
        },
    },
});
userSchema.pre('save', function () {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.isModified('password')) {
            this.password = yield password_manager_1.PasswordManager.hashPassword(this.password);
        }
    });
});
userSchema.statics.build = (attrs) => {
    return new User(attrs);
};
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
