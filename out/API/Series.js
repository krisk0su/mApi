"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Serie_1 = require("../Schema/Series/Serie");
const universal_1 = require("../lib/universal");
const Season_1 = require("../Schema/Series/Season");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Episode_1 = require("../Schema/Series/Episode");
exports.SeriesRouter = express_1.default.Router();
const pageSize = 20;
try {
    exports.SeriesRouter.post("/create", async (req, res) => {
        const serie = req.body;
        const result = await CreateSerie(serie);
        res.status(200).send(result);
    });
    exports.SeriesRouter.get("/:id", async (req, res) => {
        console.log("req", req.params);
        const id = req.params.id;
        const serie = await Serie_1.Serie.findById(id).populate("seasons");
        console.log("serie", serie);
        res.status(200).send(serie);
    });
    exports.SeriesRouter.post("/all", async (req, res) => {
        console.log("body", req.body);
        const { currentPage } = req.body;
        const take = currentPage * pageSize;
        const skip = take - pageSize;
        const count = await Serie_1.Serie.find().countDocuments();
        const totalPages = Math.ceil(count / pageSize);
        const series = await Serie_1.Serie.find().skip(skip).limit(pageSize);
        res.status(200).send({ series, totalPages });
    });
    exports.SeriesRouter.post("/episode", async (req, res) => {
        const reqEpisode = req.body;
        console.log("episode", reqEpisode);
        const episode = new Episode_1.Episode({
            _id: mongoose_1.default.Types.ObjectId(),
            name: reqEpisode.name,
            link: reqEpisode.link,
            parent: reqEpisode.seasonId,
        });
        const savedEpisode = await episode.save();
        const currentSeason = await Season_1.Season.findById(reqEpisode.seasonId);
        currentSeason.episodes.push(savedEpisode);
        const savedSeason = await currentSeason.save();
        res.status(200).send(true);
    });
    exports.SeriesRouter.get("/episode/:id", async (req, res) => {
        const id = req.params.id;
        const season = await Episode_1.Episode.findById(id).populate("parent");
        res.status(200).send(season);
    });
    exports.SeriesRouter.get("/season/:id", async (req, res) => {
        const id = req.params.id;
        const season = await Season_1.Season.findById(id).populate("episodes");
        res.status(200).send(season);
    });
}
catch (err) {
    console.log("err", err);
}
const CreateSerie = async (serie) => {
    const genre = await universal_1.getGenre(serie.genre);
    const cSerie = new Serie_1.Serie({
        _id: mongoose_1.default.Types.ObjectId(),
        ...serie,
        genre,
    });
    const seasons = await CreateSeasons(serie.seasons, cSerie._id);
    cSerie.seasons = seasons;
    const res = await cSerie.save();
    return res;
};
const CreateSeasons = async (seasons, serieId) => {
    let seasonArr = [];
    for (let i = 0; i < seasons; i++) {
        const season = new Season_1.Season({
            _id: mongoose_1.default.Types.ObjectId(),
            name: `Season ${i + 1}`,
            parent: serieId,
        });
        const res = await season.save();
        seasonArr.push(res);
    }
    return seasonArr;
};
//# sourceMappingURL=Series.js.map