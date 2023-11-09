const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

// router.route("/signin").post(userController.signin);
router.route("/login").post(userController.login);

module.exports = router;
