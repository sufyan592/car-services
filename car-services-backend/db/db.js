const mongoose = require("mongoose");
mongoose
  .connect(process.env.DB_CONNECTION)
  .then(() => {
    console.log("Database in connected SuccessFully.");
  })
  .catch((err) => {
    console.log(err);
  });
module.exports = mongoose;
