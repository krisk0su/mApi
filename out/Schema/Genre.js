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
const GenreSchema = new mongoose_1.Schema({
    _id: mongoose_1.default.Types.ObjectId,
    name: { type: String, required: true },
});
exports.Genre = mongoose_1.default.model("Genre", GenreSchema);
//# sourceMappingURL=Genre.js.map