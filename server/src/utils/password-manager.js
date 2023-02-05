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
exports.PasswordManager = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
class PasswordManager {
    static hashPassword(plainPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt(10);
            return yield bcrypt_1.default.hash(plainPassword, salt);
        });
    }
    static comparePassword(inputPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(inputPassword, hashedPassword);
        });
    }
    static validatePassword(inputPassword) {
        let totalCharacters = inputPassword.length, specialCharacters = 0, lowerCase = 0, upperCase = 0, numbers = 0;
        for (let i = 0; i < inputPassword.length; i++) {
            const asciiCode = inputPassword.charCodeAt(i);
            if ((asciiCode >= 32 && asciiCode <= 47) ||
                (asciiCode >= 58 && asciiCode <= 64) ||
                (asciiCode >= 91 && asciiCode <= 96) ||
                (asciiCode >= 123 && asciiCode <= 126)) {
                specialCharacters++;
            }
            else if (asciiCode > 48 && asciiCode <= 57) {
                numbers++;
            }
            else if (asciiCode >= 65 && asciiCode <= 90) {
                upperCase++;
            }
            else if (asciiCode >= 65 && asciiCode <= 90) {
                upperCase++;
            }
            else if (asciiCode >= 97 && asciiCode <= 122) {
                lowerCase++;
            }
        }
        return (totalCharacters >= 8 &&
            totalCharacters <= 100 &&
            upperCase >= 1 &&
            lowerCase >= 1 &&
            specialCharacters >= 1 &&
            numbers >= 1);
    }
}
exports.PasswordManager = PasswordManager;
