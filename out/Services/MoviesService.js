"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Movies_1 = require("../Schema/Movies");
const mongoose_1 = __importDefault(require("mongoose"));
const universal_1 = require("../lib/universal");
exports.createMovie = async (movie) => {
    const genre = await universal_1.getGenre(movie.genre);
    const cMovie = new Movies_1.Movie({
        _id: mongoose_1.default.Types.ObjectId(),
        ...movie,
        genre,
    });
    const res = await cMovie.save();
    console.log("res movie", res);
    return res;
};
//# sourceMappingURL=MoviesService.js.map