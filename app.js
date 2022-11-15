const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const catalogueRoutes = require("./routes/catalogue");
const bookRoutes = require("./routes/book");
const purchaseRoutes = require("./routes/purchase");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const fs = require("fs");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");
const app = express();
require("dotenv").config();
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
// app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("assets"));
app.use(express.static("uploads"));
app.use("/uploads", express.static("uploads"));
app.use("/css", express.static(__dirname + "assets/css"));
app.use("/js", express.static(__dirname + "assets/js"));
app.use("/img", express.static(__dirname + "assets/img"));
app.use("/sass", express.static(__dirname + "assets/sass"));
app.use("/fonts", express.static(__dirname + "assets/fonts"));
app.use("assets/css", express.static(__dirname + "assets/assets/css"));
app.use("assets/js", express.static(__dirname + "assets/assets/js"));
app.use("assets/img", express.static(__dirname + "assets/assets/img"));
app.use("assets/sass", express.static(__dirname + "assets/assets/sass"));
app.use("assets/fonts", express.static(__dirname + "assets/assets/fonts"));
const APP_PORT = 8000;
app.set("view engine", "ejs");
const { checkUser } = require("./middlewares/verify");

const config = require("./config/database");

//offline database

const connection = mongoose.connect(config.database, {
  useUnifiedTopology: true,
});
if (connection) {
  console.log("database connected offline");
} else {
  console.log("database connection error");
}

//to use online database uncomment the below lines

// const url = config.db;

// const connectionParams = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
// mongoose
//   .connect(url, connectionParams)
//   .then(() => {
//     console.log("Connected to online database ");
//   })
//   .catch((err) => {
//     console.error(`Error connecting to the database. n${err}`);
//   });

app.use(expressLayouts);

app.set("layout", "./layouts/full-width");

app.use(userRoutes);
app.use("/admin", adminRoutes);
app.use("/user", authRoutes);
app.use("/book", bookRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/catalogue", catalogueRoutes);

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
