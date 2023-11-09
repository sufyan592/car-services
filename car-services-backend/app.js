const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const carRoute = require("./routes/carRoute");
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/car-details", carRoute);

module.exports = app;
