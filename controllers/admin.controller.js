const Admin = require("../models/admin");
const Purchase = require("../models/purchase");
const Rental = require("../models/rental");
const User = require("../models/user");
const Book = require("../models/book");
const jwt = require("jsonwebtoken");
const { currentDate } = require("../config/constants");
//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect email
  if (err.message === "incorrect email") {
    errors.email = "email not registered..!";
  }
  //incorrect password
  if (err.message === "incorrect password") {
    errors.password = "incorrect password!";
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "Email already registered";
    return errors;
  }

  //validation errors
  if (err.message.includes("admin validation failed")) {
    console.log(
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(properties);
        errors[properties.path] = properties.message;
      })
    );
  }
  return errors;
};

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ADMIN_SECRET, {
    expiresIn: maxAge,
  });
};
module.exports.get_admin_dashboard = (req, res) => {
  res.render("../views/pages/admin/dashboard", {
    title: "Dashboard Admin",
    layout: "./layouts/admin-dash",
  });
};
module.exports.get_admin_login = (req, res) => {
  res.render("../views/pages/admin/login", {
    title: "Admin Login",
    layout: "./layouts/admin",
  });
};

module.exports.sign_admin = async (req, res) => {
  let todayDate = currentDate();
  const { name, email, password } = req.body;

  try {
    const admin = await Admin.create({
      name,
      email,
      password,
      date: todayDate,
    });
    const token = createToken(admin._id);
    res.cookie("admin", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ admin: admin });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_admin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.login(email, password);
    const token = createToken(admin._id);
    res.cookie("admin", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ admin: admin._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.get_logout = async (req, res) => {
  res.cookie("admin", "", { maxAge: 1 });
  res.redirect("/admin");
};
module.exports.get_all_purchase = async (req, res) => {
  const result = await Purchase.find({}).populate("bookId userId");
  console.log(result);
  res.render("../views/pages/admin/all-purchase", {
    title: "All Purchased Books",
    layout: "./layouts/admin-dash",
    result: result,
  });
};
module.exports.get_all_rent = async (req, res) => {
  const result = await Rental.find({}).populate("bookId userId");
  console.log(result);
  res.render("../views/pages/admin/all-rental", {
    title: "All Rented Books",
    layout: "./layouts/admin-dash",

    result: result,
  });
};
