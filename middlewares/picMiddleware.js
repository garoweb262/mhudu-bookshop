const multer = require("multer");
const { randomCode } = require("../config/constants");
let pin = randomCode();
const path = require("path");
let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "_" + file.originalname);
  },
});
var uploadProfile = multer({
  storage: storage,
});
module.exports = uploadProfile;
