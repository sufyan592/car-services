const express = require("express");
const router = express.Router();
// const userController = require("../Controller/userController");
const carController = require("../Controller/carCotroller");

router.route("/").post(carController.carDetails);

module.exports = router;
