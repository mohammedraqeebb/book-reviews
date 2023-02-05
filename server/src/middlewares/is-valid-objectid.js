"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidObjectId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isValidObjectId = (id) => {
    if (mongoose_1.default.Types.ObjectId.isValid(id)) {
        if (String(new mongoose_1.default.Types.ObjectId(id)) === id) {
            return true;
        }
        return false;
    }
    return false;
};
exports.isValidObjectId = isValidObjectId;
