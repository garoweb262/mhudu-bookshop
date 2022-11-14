const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
  bookId: {
    type: String,
    required: true,
    lowercase: true,
  },
  status: {
    type: String,
    required: true,

  },
  userId: {
    type: String,
    required: true,

  },
  price: {
    type: String,
    required: true,

  },
  startDate: {
    type: String,
    required: true,

  },
  endDate: {
    type: String,
    required: true,

  },
  date: {
    type: String,
    required: true,
  },
});

const Rental = mongoose.model("rental", rentalSchema);

module.exports = Book;
