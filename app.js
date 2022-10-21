const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const app = express();
app.use(express.json());
app.use(express.static("assets"));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/js", express.static(__dirname + "assets/js"));
app.use("/img", express.static(__dirname + "assets/img"));
app.use("/sass", express.static(__dirname + "assets/sass"));
app.use("/fonts", express.static(__dirname + "assets/fonts"));
app.use("/css", express.static(__dirname + "assets/assets/css"));
app.use("/js", express.static(__dirname + "assets/assets/js"));
app.use("/img", express.static(__dirname + "assets/assets/img"));
app.use("/sass", express.static(__dirname + "assets/assets/sass"));
app.use("/fonts", express.static(__dirname + "assets/assets/fonts"));

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
app.use(expressLayouts);
app.set("layout", "./layouts/full-width");
// app.set("layout", "./layouts/full-width");

app.use(userRoutes);
app.use("/admin", adminRoutes);
app.listen(APP_PORT, function () {
  console.log("server running " + APP_PORT);
});
