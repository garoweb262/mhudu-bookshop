const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
  const token = req.cookies.user;

  //check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.USER_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

//check current user
const checkUser = async (req, res, next) => {
  const token = req.cookies.user;

  if (token) {
    jwt.verify(token, process.env.USER_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);
        // console.log(token);
        let user = await User.findById(decodedToken._id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
