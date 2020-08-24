"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Genre_1 = require("../Schema/Genre");
const mongoose_1 = __importDefault(require("mongoose"));
exports.getGenre = async (genre) => {
    const genres = genre.split(",").map((gen) => gen.trim());
    const genreIds = await Promise.all(genres.map(async (name) => {
        const genre = await getOrCreateGenre(name);
        return genre;
    }));
    return genreIds;
};
const getOrCreateGenre = async (name) => {
    const res = await Genre_1.Genre.findOne({ name });
    if (!res) {
        const genre = await Genre_1.Genre.create({
            _id: mongoose_1.default.Types.ObjectId(),
            name,
        });
        return genre._id;
    }
    return res._id;
};
//# sourceMappingURL=universal.js.map