const multer = require("multer");

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
