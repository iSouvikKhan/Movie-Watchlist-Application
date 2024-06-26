const express = require('express');
const zod = require("zod");
const { Movie } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware/index");

const router = express.Router();

const movieBody = zod.object({
    title: zod.string().min(5).max(30),
    description: zod.string().min(5).max(100),
    releaseyear: zod.number().min(1900).max(2100),
    genre: zod.string().min(5).max(15),
    watchstatus: zod.boolean(),
    rating: zod.number().min(1).max(10),
    review: zod.string().min(5).max(100)
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const { success, error } = movieBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Validation error at post movies",
                error: error.errors
            });
        }

        await Movie.create(req.body);

        res.json({
            message: "Movie added successfully"
        });
    } catch (error) {
        console.log("post movies route", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get("/", authMiddleware, async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        console.log("get movies route", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { success, error } = movieBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Validation error at put movies",
                error: error.errors
            });
        }

        const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true });
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json({
            message: "Movie updated successfully"
        });
    } catch (error) {
        console.log("put movies route", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json({
            message: "Movie deleted successfully"
        });
    } catch (error) {
        console.log("delete movies route", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;
