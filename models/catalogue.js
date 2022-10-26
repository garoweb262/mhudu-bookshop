const mongoose = require("mongoose");

const catalogueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Catalogue = mongoose.model("catalogue", catalogueSchema);

module.exports = Catalogue;
