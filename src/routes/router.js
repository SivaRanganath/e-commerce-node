const express = require("express");
const userLoggingsRouter = require("./user-loggings-router.js");
const router = express.Router();

router.use("/", userLoggingsRouter);

module.exports = router;
