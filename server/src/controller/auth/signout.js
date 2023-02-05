"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signout = void 0;
const signout = (req, res) => {
    req.session = null;
    return res.status(200).send({ message: 'you are logged out' });
};
exports.signout = signout;
