"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
exports.UsersRouter = express_1.default.Router();
exports.UsersRouter.post("/create", async (req, res) => {
    console.log("body", req.body);
    res.status(200).send({});
});
//# sourceMappingURL=Users.js.map