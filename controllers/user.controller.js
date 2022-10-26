const User = require("../models/user");
const Catalogue = require("../models/catalogue");
const jwt = require("jsonwebtoken");
const { randomCode, currentDate, sendEMail } = require("../config/constants");
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
module.exports.get_catalogue_add = (req, res) => {
  res.render("../views/pages/admin/add-catalogue", {
    title: "Add Catalogue",
    layout: "./layouts/admin",
  });
};

module.exports.get_allBooks = (req, res) => {
  res.render("../views/pages/admin/all-books", {
    title: "All Books",
    layout: "./layouts/admin-dash",
  });
};
module.exports.get_catalogue_form = (req, res) => {
  Catalogue.find().then((result, err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("../views/pages/admin/add-book", {
        title: "All Books",
        layout: "./layouts/admin",
        result,
      });
    }
  });
};
module.exports.get_allUsers = (req, res) => {
  User.find().then((data, err) => {
    if (err) {
      console.log(err);
    } else {
      res.render("../views/pages/admin/all-users", {
        title: "All Users",
        layout: "./layouts/admin-dash",
        data,
      });
    }
  });
};
module.exports.get_allPurchase = (req, res) => {
  res.render("../views/pages/admin/all-purchase", {
    title: "All Purchase",
    layout: "./layouts/admin-dash",
  });
};
module.exports.get_allRental = (req, res) => {
  res.render("../views/pages/admin/all-rental", {
    title: "All Rental",
    layout: "./layouts/admin-dash",
  });
};
module.exports.sign_user = async (req, res) => {
  let dates = currentDate();
  const { name, email, phone, street, lga, state, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      phone,
      street,
      lga,
      state,
      PassSecret: randomCode(),
      password,
      date: dates,
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
module.exports.get_all_User = (req, res) => {
  User.find()
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "error fetching book" });
    });
};
module.exports.get_one_User = async (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((result) => {
      res.status(200).json({ success: true, result });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ success: false, message: "error fetching catalogues" });
    });
};
module.exports.updateUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((result) => {
      res.status(200).json({ success: true, message: "updated successfully" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "error updating book" });
    });
};
module.exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id)
    .then((result) => {
      res.status(200).json({ success: true, message: "deleted successfully" });
    })
    .catch((error) => {
      res.status(500).json({ success: false, message: "error deleting book" });
    });
};
module.exports.updatePin = (req, res) => {
  const PassSecret = req.query.passSecret;
  const email = req.query.email;
  let pin = passPin();
  console.log(pin);
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (result) {
        let email = req.body.email;
        let mailMessage = `Hello use the following link to reset your Password ${fAppUrl}/update-password?passSecret=${pin}`;
        sendEMail(email, `${appName} Password Reset`, mailMessage);
        User.updateOne({ passSecret: pin }, { email: email }).then((user) => {
          res.status(200).json({
            message: "Pin updated...!!!",
            success: true,
            mailMessage,
          });
        });
      } else {
        res.status(200).json({
          message: "Email not registered...!",
          success: false,
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Something went wrong, try again",
      });
    });
};

module.exports.updatePass = (req, res) => {
  const passSecret = req.query.passSecret;
  console.log(passSecret);
  User.findOne({ where: { passSecret: passSecret } })
    .then((result) => {
      bcryptjs.genSalt(10, function (err, salt) {
        bcryptjs.hash(req.body.password, salt, function (err, hash) {
          if (result) {
            let password = req.body.password;

            User.updateOne({ password: hash }, { passSecret: passSecret }).then(
              (user) => {
                res.status(200).json({
                  message: "Password Updated",
                  success: true,
                  user,
                });
              }
            );
          } else {
            res.status(200).json({
              message: "Password not updated...!!!",
              success: false,
            });
          }
        });
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server Error...!!",
        error: error,
      });
    });
};
