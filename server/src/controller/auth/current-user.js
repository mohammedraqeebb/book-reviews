"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserInfo = void 0;
const currentUserInfo = (req, res) => {
    if (!req.currentUser) {
        return res.status(200).send({ user: null });
    }
    const { currentUser } = req;
    res.send({ user: { id: currentUser.id, name: currentUser.name } });
};
exports.currentUserInfo = currentUserInfo;
