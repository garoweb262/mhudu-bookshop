const multer = require("multer");
const { randomCode } = require("../config/constants");
let pin = randomCode();
let storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/");
  },

  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, pin + "." + fileName.split(".")[1]);
  },
});
var upload = multer({
  storage: storage,
});
module.exports = upload;
