import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./API/Movies";
mongoose.connect(
  "mongodb+srv://krisk0su:Krizk0tak3n@movies-h5gox.mongodb.net/Movies?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Create a new express app instance
const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.use("/movies", router);

app.get("/", function (req, res) {
  res.send("hello world");
});
app.listen(5000, function () {
  console.log("App is listening on port 5000!");
});
