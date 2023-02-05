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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublisher = void 0;
const publisher_1 = require("../../models/publisher");
const createPublisher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, bio, street, state, country, countryCode, phoneNumber, establishedDate, } = req.body;
    const publisher = publisher_1.Publisher.build({
        name,
        bio,
        street,
        state,
        country,
        countryCode,
        phoneNumber,
        userId: req.currentUser.id,
        establishedDate,
    });
    yield publisher.save();
    return res.status(201).send({ publisher });
});
exports.createPublisher = createPublisher;
