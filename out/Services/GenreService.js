"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Genre_1 = require("../Schema/Genre");
exports.getAllGenres = async () => {
    const genres = await Genre_1.Genre.find();
    return genres;
};
//# sourceMappingURL=GenreService.js.map