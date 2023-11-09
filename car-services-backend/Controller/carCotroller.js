const carData = require("../model/carModel");
exports.carDetails = async (req, res, next) => {
  try {
    const car = await carData.create(req.body);
    const data = await car.save();

    res.status(201).json({
      status: "Success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fails",
      error,
    });
  }
};
