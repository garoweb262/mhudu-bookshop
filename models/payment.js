const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  cardNo: {
    type: String,
  },
  cvv: {
    type: String,
  },
  expireDate: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Payment = mongoose.model("payment", paymentSchema);

module.exports = Payment;
