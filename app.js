const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const app = express();
app.use(express.json());
app.use(express.static("assets"));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/js", express.static(__dirname + "assets/js"));
app.use("/img", express.static(__dirname + "assets/img"));
app.use("/sass", express.static(__dirname + "assets/sass"));
app.use("/fonts", express.static(__dirname + "assets/fonts"));

const config = require("./config/database");
const connection = mongoose.connect(config.database, {
  useUnifiedTopology: true,
});
const APP_PORT = 8000;
app.set("view engine", "ejs");

if (connection) {
  console.log("database connected");
} else {
  console.log("database connection error");
}
app.get("", (req, res) => {
  res.render("index");
});
app.listen(APP_PORT, function () {
  console.log("server running " + APP_PORT);
});
