const User = require("../models/user");
const jwt = require("jsonwebtoken");
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
  if (err.message.includes("user validation failed")) {
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
  return jwt.sign({ id }, " muhdumarhudu", {
    expiresIn: maxAge,
  });
};

module.exports.get_home = (req, res) => {
  res.render("../views/pages/guest/index", { title: "Home Noorwa bookshop" });
};
module.exports.get_about = (req, res) => {
  res.render("../views/pages/guest/about", { title: "About Noorwa bookshop" });
};
module.exports.get_contact = (req, res) => {
  res.render("../views/pages/guest/contact", {
    title: "Contact Noorwa bookshop",
  });
};
module.exports.get_login = (req, res) => {
  res.render("../views/pages/guest/login", { title: "login Noorwa bookshop" });
};
module.exports.get_signup = (req, res) => {
  res.render("../views/pages/guest/signup", {
    title: "Signup Noorwa bookshop",
  });
};
module.exports.get_pass = (req, res) => {
  res.render("../views/pages/guest/forget-pass", {
    title: "Forget-Passsword Noorwa bookshop",
  });
};
module.exports.get_change = (req, res) => {
  res.render("../views/pages/guest/change-pass", {
    title: "Forget-Passsword Noorwa bookshop",
  });
};
module.exports.get_dasboard = (req, res) => {
  res.render("../views/pages/users/dashboard", {
    title: "Dashboard Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
module.exports.get_profile = (req, res) => {
  res.render("../views/pages/users/profile", {
    title: "Profile Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
module.exports.get_my_books = (req, res) => {
  res.render("../views/pages/users/my-books", {
    title: "My Books Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
module.exports.get_update_profile = (req, res) => {
  res.render("../views/pages/users/update-profile", {
    title: "Update Profile Noorwa bookshop",
    layout: "./layouts/dashboard-lay",
  });
};
module.exports.sign_user = async (req, res) => {
  const { name, email, phone, street, lga, state, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      phone,
      street,
      lga,
      state,
      password,
    });
    const token = createToken(user._id);
    res.cookie("user", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.login_user = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("user", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
module.exports.get_logout = async (req, res) => {
  res.cookie("user", "", { maxAge: 1 });
  res.redirect("/");
};
