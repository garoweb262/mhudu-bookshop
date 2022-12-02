const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Purchase = mongoose.model("purchase", purchaseSchema);

module.exports = Purchase;
