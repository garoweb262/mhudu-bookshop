const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");

const requireAuthAdmin = (req, res, next) => {
  const token = req.cookies.admin;

  //check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.ADMIN_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/admin");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/admin");
  }
};

//check current user
const checkAdmin = async (req, res, next) => {
  const token = req.cookies.admin;

  if (token) {
    jwt.verify(token, process.env.ADMIN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.admin = null;
        next();
      } else {
        // console.log(decodedToken);
        // console.log(token);
        let user = await Admin.findById(decodedToken._id);
        res.locals.admin = admin;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};
function checkAuthAdmin(req, res, next) {
  try {
    //    const token = req.cookies.user;
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ADMIN_SECRET);
    req.userData = decodedToken;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or expired token",
      error: e,
    });
  }
}

module.exports = { requireAuthAdmin, checkAdmin, checkAuthAdmin };
