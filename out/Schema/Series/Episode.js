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
const EpisodeSchema = new mongoose_1.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    name: { type: String, required: true },
    link: { type: String, required: true },
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: "Season", required: false },
});
exports.Episode = mongoose_1.default.model("Episode", EpisodeSchema);
//# sourceMappingURL=Episode.js.map