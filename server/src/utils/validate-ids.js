"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIds = void 0;
const middlewares_1 = require("../middlewares");
const validateIds = (ids) => {
    for (let i = 0; i < ids.length; i++) {
        if (!(0, middlewares_1.isValidObjectId)(ids[i])) {
            return false;
        }
    }
    return true;
};
exports.validateIds = validateIds;
