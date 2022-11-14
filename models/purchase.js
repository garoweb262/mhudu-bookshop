const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema(
  {
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
