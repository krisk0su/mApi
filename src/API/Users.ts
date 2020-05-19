import express from "express";
export const UsersRouter = express.Router();

UsersRouter.post("/create", async (req, res) => {
  console.log("body", req.body);

  res.status(200).send({});
});
