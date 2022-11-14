const Rental = require("../models/rental");
const Book = require("../models/book");
const { currentDate } = require("../config/constants");

module.exports.create_catalogue = async (req, res) => {
  const { name, description } = req.body;
  let dates = currentDate();

  try {
    const rent = await Rental.create({
      name,
      description,
      date: dates,
    });
    const rentedBook = await rent.save();
    res.status(201).json({ success: true, data: rentedBook });
  } catch (err) {
    res.status(400).json({ errors });
  }
};
