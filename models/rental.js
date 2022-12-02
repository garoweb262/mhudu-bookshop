const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "book",
    },
    status: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "user",
    },
    price: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Rental = mongoose.model("rental", rentalSchema);

module.exports = Rental;
