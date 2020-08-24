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
const SerieSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true },
    title: { type: String, required: true },
    plot: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Genre", required: true },
    rating: { type: Number, required: true },
    actors: { type: [String], required: true },
    poster: { type: String, required: true },
    seasons: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Season", required: false }],
});
exports.Serie = mongoose_1.default.model("Serie", SerieSchema);
//# sourceMappingURL=Serie.js.map