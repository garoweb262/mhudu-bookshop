const express = require("express");
const mongodb = require("mongodb");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
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
const APP_PORT = 8000;
app.set("view engine", "ejs");

const config = require("./config/database");
const { checkUser } = require("./middlewares/verify");
const connection = mongoose.connect(config.database, {
  useUnifiedTopology: true,
});

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
app.use("/user", authRoutes);
app.get("*", checkUser);
app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");

  res.cookie("newUser", false);

  res.send("you got the cookies!");
});

app.get("/read-cookies", (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.json(cookies);
});

app.listen(APP_PORT, function () {
  console.log("server running " + APP_PORT);
});
