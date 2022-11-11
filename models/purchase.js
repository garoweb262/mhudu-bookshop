const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
  },
  catalogue: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
  },
  dp: {
    type: String,
    required: true,
  },
  pdf: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Purchase = mongoose.model("purchase", purchaseSchema);

module.exports = Book;
