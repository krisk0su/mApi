"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Movies_1 = require("../Schema/Movies");
const MoviesService_1 = require("../Services/MoviesService");
exports.MoviesRouter = express_1.default.Router();
const pageSize = 20;
try {
    exports.MoviesRouter.post("/search", async (req, res) => {
        console.log("body", req.body);
        const { currentPage, searchPhrase } = req.body;
        const take = currentPage * pageSize;
        const skip = take - pageSize;
        const count = await Movies_1.Movie.find({
            title: { $regex: `${searchPhrase}`, $options: "i" },
        }).countDocuments();
        console.log("count", count);
        const totalPages = Math.ceil(count / pageSize);
        const movies = await Movies_1.Movie.find({
            title: { $regex: `${searchPhrase}`, $options: "i" },
        })
            .skip(skip)
            .limit(pageSize);
        res.status(200).send({ movies, totalPages });
    });
    exports.MoviesRouter.post("/genre", async (req, res) => {
        console.log("genre", req.body);
        const { currentPage, genre } = req.body;
        const take = currentPage * pageSize;
        const skip = take - pageSize;
        const count = await Movies_1.Movie.find({
            genre,
        }).countDocuments();
        const totalPages = Math.ceil(count / pageSize);
        const movies = await Movies_1.Movie.find({
            genre,
        })
            .skip(skip)
            .limit(pageSize);
        res.status(200).send({ movies, totalPages });
    });
    exports.MoviesRouter.post("/all", async (req, res) => {
        const { currentPage } = req.body;
        const take = currentPage * pageSize;
        const skip = take - pageSize;
        const count = await Movies_1.Movie.find().countDocuments();
        const totalPages = Math.ceil(count / pageSize);
        const movies = await Movies_1.Movie.find().skip(skip).limit(pageSize);
        res.status(200).send({ movies, totalPages });
    });
    exports.MoviesRouter.get("/:id", async (req, res) => {
        const id = req.params.id;
        console.log("id", id);
        const movie = await Movies_1.Movie.findById(id);
        res.send(movie);
    });
    exports.MoviesRouter.post("/create", async (req, res) => {
        const movie = await MoviesService_1.createMovie(req.body);
        res
            .status(200)
            .json({ msg: "movie created succesfully", movieId: movie._id });
    });
}
catch (err) {
    console.log(err);
}
//# sourceMappingURL=Movies.js.map