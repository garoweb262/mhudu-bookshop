const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const config = require("./config/database");
const connection = mongoose.connect(config.database, {
  useUnifiedTopology: true,
});
const APP_PORT = 8000;

if (connection) {
  console.log("database connected");
} else {
  console.log("database connection error");
}
app.listen(APP_PORT, function () {
  console.log("server running " + APP_PORT);
});
