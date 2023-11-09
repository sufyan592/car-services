const mongoose = require("mongoose");
const carSchema = mongoose.Schema({
  carModel: {
    type: String,
    required: true,
    max: 30,
    min: 3,
  },
  price: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    maxLenght: 11,
  },
  images: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

const CarDetails = mongoose.model("CarDetails", carSchema);
module.exports = CarDetails;
