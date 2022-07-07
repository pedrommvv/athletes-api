import express = require('express');
import {DatabaseAccessLayer} from './services/database'
import "reflect-metadata"
import { ImageFile } from './entities/imageFile';
const app: express.Application = express();
var cors = require('cors')
const dal = new DatabaseAccessLayer()

app.use(cors())

app.get("/athletes/:id", (req, res) => {
    dal.getAthlete(req.params.id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => res.status(404).json({"error": error})
        );
});

app.get("/athletes/:id/results", (req,res) => {
    dal.getAthleteResults(req.params.id)
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => res.status(404).json({"error": error}))
})

app.get("/athletes/:id/photo", (req,res) => {
    dal.getAthletePhoto(req.params.id)
        .then((data : ImageFile) => {
            res.writeHead(200), {
                'Content-Type': data.mimeType,
                'Content-Lenght': data.content.length
            }
            res.end(data.content)
        })
        .catch((error) => res.status(404).json({"error": error}))
})

app.get("/athletes", (req, res) => {
    dal.getAthletes()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => res.status(404).json({"error": error}))
});

app.get("/games", (req,res) => {
    console.log("Received request for all games")
    dal.getGames()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => res.status(500).json({"error": error}))
})

app.get("/games/:id/athletes", (req,res) => {
    console.log("Received request for all athletes for game " + req.params.id)
    dal.getAthletesByGame(req.params.id)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => res.status(500).json({"error": error}))
})

app.listen(3000, () => {
    console.log('Started server on port 3000');
});