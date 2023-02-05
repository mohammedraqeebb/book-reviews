"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertEachArrayIdToString = void 0;
const convertEachArrayIdToString = (ids) => {
    const updatedArray = ids.map((id) => id.toString());
    return updatedArray;
};
exports.convertEachArrayIdToString = convertEachArrayIdToString;
