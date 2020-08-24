"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const MovieSchema = new mongoose_1.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    title: { type: String, required: true },
    plot: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Genre", required: true },
    rating: { type: Number, required: true },
    actors: { type: [String], required: true },
    poster: { type: String, required: true },
    trailer: { type: String, required: true },
    link1: { type: String, required: true },
    link2: { type: String, required: false },
    link3: { type: String, required: false },
});
exports.Movie = mongoose_1.default.model("Movie", MovieSchema);
//# sourceMappingURL=Movies.js.map