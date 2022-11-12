const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    lowercase: true,
  },
  status: {},
  userId: {},
  price: {},
  startDate: {},
  endDate: {},
  date: {
    type: String,
    required: true,
  },
});

const Rental = mongoose.model("rental", rentalSchema);

module.exports = Book;
