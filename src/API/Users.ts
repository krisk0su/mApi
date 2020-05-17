import express from "express";
import { User, IUser } from "../Schema/Users";
export const UsersRouter = express.Router();

UsersRouter.post("/create", async (req, res) => {
  console.log("body", req.body);

  res.status(200).send({});
});
