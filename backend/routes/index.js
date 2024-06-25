const express = require("express");

const userRouter = require("./user");
const movieRouter = require("./movie");

const router = express.Router();

router.use("/user", userRouter);
router.use("/movie", movieRouter);

module.exports = router;