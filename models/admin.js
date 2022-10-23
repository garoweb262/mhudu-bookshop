const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const { isEmail } = require("validator");
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please enter a valid email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "please enter a valid email"],
  },
  name: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "please enter a password"],
    minlength: [8, "minimun password length is 8 character"],
  },
});

//fire a function before doc save to db
adminSchema.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

//static method to login
adminSchema.statics.login = async function (email, password) {
  const admin = await this.findOne({ email });
  if (admin) {
    const auth = await bcryptjs.compare(password, admin.password);
    if (auth) {
      return admin;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};
const Admin = mongoose.model("admin", adminSchema);

module.exports = Admin;
