"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controller/auth");
const verify_otp_1 = require("../controller/auth/verify-otp");
const validate_request_1 = require("../middlewares/validate-request");
const password_manager_1 = require("../utils/password-manager");
exports.authRouter = express_1.default.Router();
const PASSWORD_VALIDATION_ERROR_MESSAGE = 'password must be atleast eight characters containing atleast one special character,digit, lowercase and uppercase alphabet';
exports.authRouter.post('/signup', [
    (0, express_validator_1.body)('name').trim().notEmpty().withMessage('enter name'),
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('enter valid email'),
    (0, express_validator_1.body)('password')
        .trim()
        .custom((password) => password_manager_1.PasswordManager.validatePassword(password))
        .withMessage(PASSWORD_VALIDATION_ERROR_MESSAGE),
], validate_request_1.validateRequest, auth_1.signup);
exports.authRouter.post('/signin', [
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('enter valid email'),
    (0, express_validator_1.body)('password')
        .trim()
        .custom((password) => password_manager_1.PasswordManager.validatePassword(password))
        .withMessage(PASSWORD_VALIDATION_ERROR_MESSAGE),
], validate_request_1.validateRequest, auth_1.signin);
exports.authRouter.post('/signout', auth_1.signout);
exports.authRouter.post('/name', [(0, express_validator_1.body)('userId').exists().withMessage('user id is required to be edited')], validate_request_1.validateRequest, auth_1.userName);
exports.authRouter.post('/forgotpassword', [(0, express_validator_1.body)('email').trim().isEmail().withMessage('enter valid email')], validate_request_1.validateRequest, auth_1.forgotPassword);
exports.authRouter.post('/changepassword', [
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('enter valid email'),
    (0, express_validator_1.body)('password')
        .trim()
        .custom((password) => password_manager_1.PasswordManager.validatePassword(password))
        .withMessage(PASSWORD_VALIDATION_ERROR_MESSAGE),
], validate_request_1.validateRequest, auth_1.changePassword);
exports.authRouter.post('/verifyotp', [
    (0, express_validator_1.body)('email').exists().trim().isEmail().withMessage('enter valid email'),
    (0, express_validator_1.body)('otp').exists().withMessage('otp is required'),
], validate_request_1.validateRequest, verify_otp_1.verifyotp);
exports.authRouter.post('/googlesignin', auth_1.googleSignin);
exports.authRouter.post('/currentuser', auth_1.currentUserInfo);
