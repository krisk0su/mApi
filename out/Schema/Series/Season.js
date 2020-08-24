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
const SeasonSchema = new mongoose_1.Schema({
    id: mongoose_1.default.Types.ObjectId,
    name: { type: String, required: true },
    episodes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Episode", required: false }],
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: "Serie", required: false },
});
exports.Season = mongoose_1.default.model("Season", SeasonSchema);
//# sourceMappingURL=Season.js.map